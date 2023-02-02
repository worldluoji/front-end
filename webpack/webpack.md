# webpack
webpack是一个模块打包器（module bundler），webpack视html，JS，CSS，图片等文件都是一种资源 ，
每个资源文件都是一个模块（module）文件，webpack就是根据每个模块文件之间的依赖关系将所有的模块打包（bundle）起来。

- 对 CommonJS 、ES6的语法做了兼容
- 对js、css、图片等资源文件都支持打包（适合团队化开发）
比方你写一个js文件，另外一个人也写一个js文件，需要合并很麻烦，现在交给webpack合并很简单
- 有独立的配置文件
- 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
- 具有强大的Plugin（插件）接口，大多是内部插件，使用起来比较灵活

它的核心思路是将源代码以及图片、样式文件等资源文件都视为模块，然后通过提供对不同类型资源的处理器，将它们进行统一处理，形成最终可在浏览器运行的代码。

<img src="Webpack 的工作机制.webp" />

<br>

## webpack原理
webpack 的核心原理就是通过分析 JavaScript 中的 require 语句，分析出当前 JavaScript 文件所有的依赖文件，
然后递归分析之后，就得到了整个项目的一个依赖图。
对图中不同格式的文件执行不同的 loader，比如会把 CSS 文件解析成加载 CSS 标签的 JavaScript 代码，
最后基于这个依赖图获取所有的文件。

进行打包处理之后，放在内存中提供给浏览器使用，然后 dev-server 会启动一个测试服务器打开页面，
并且在代码文件修改之后可以通过 WebSocket 通知前端自动更新页面，也就是我们熟悉的热更新功能。

<br>

## webpack的核心概念
webpack的核心概念分为: 入口(Entry)、出口(Output)、加载器(Loader)、插件(Plugins)、模式(mode);​
- 入口(Entry)：入口起点告诉 webpack 从哪里开始，并根据依赖关系图确定需要打包的文件内容
- 出口（Output）：output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中
- 加载器(Loader)：webpack 将所有的资源（css, js, image 等）都看做模块，
但 webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。
loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。
在更高层面，在 webpack 的配置中，loader 有两个属性：
  - test 属性，识别出哪些文件会被转换。
  - use 属性，定义出在进行转换时，应该使用哪个 loader。
```
rules: [
  {
    test: /\.(js|jsx)$/,
    use: 'babel-loader'
  }
]
```
 
- 插件(Plugins)：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
plgin可以对loader打包后的模块文件（bundle.js）进行二次优化处理，例如：代码压缩从而减小文件体积
提供辅助开发的作用：例如：热更新（浏览器实时显示）。
```
plugins: [
 new webpack.optimize.UglifyJsPlugin(),
 new HtmlWebpackPlugin({template: './src/index.html'})
]
```

## 模版
```
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'index' : path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {  
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(), 
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  externals: {
    'vue': 'window.Vue'
  }
}
```
module，这是 Webpack 打包构建的核心所在，你可以根据自己项目的打包需要，选择对应的打包加载器（Loader）来处理指定的打包文件。
这里我们选择了 vue-loader 和 css-loader 就是为了解决项目里 Vue.js3 源码和 Vue.js3 源码里的 CSS 代码的打包编译处理。

Vue 的加载插件（VueLoaderPlugin）来辅助你在编译 Vue.js 3 代码时候做相关的编译处理。
这里也用了 CSS 的分离插件（MiniCssExtractPlugin），主要是在 Webpack 打包的生命周期过程中将 Vue.js 3 源码里的 CSS 代码分离出单独的 CSS 文件。

externals，这个是声明在 Webpack 打包编译过程中，有哪些源码依赖的 npm 模块需要“排除打包”处理，
也就是不做打包整合处理。我们这里就是将 Vue.js 3 的运行源码进行“排除打包”处理，让代码最终代码依赖的 Vue.js 3 运行时，从 window.Vue 全局变量获取。
这么做的好处就是通过减少打包的内容来缩短打包时间。


## 模式
通过选择 development, production 或 none 之中的一个，来设置 mode 参数，
你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。
```
module.exports = {
  mode: 'production',
};
```

## 浏览器兼容性(browser compatibility)
Webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。
webpack 的 import() 和 require.ensure() 需要 Promise。
如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载 polyfill。

<br>

## 参考
https://www.webpackjs.com/concepts/