# webpack
webpack是一个模块打包器（module bundler），webpack视html，JS，CSS，图片等文件都是一种 资源 ，
每个资源文件都是一个模块（module）文件，webpack就是根据每个模块文件之间的依赖关系将所有的模块打包（bundle）起来。

- 对 CommonJS 、ES6的语法做了兼容
- 对js、css、图片等资源文件都支持打包（适合团队化开发）
比方你写一个js文件，另外一个人也写一个js文件，需要合并很麻烦，现在交给webpack合并很简单
- 有独立的配置文件
- 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
- 具有强大的Plugin（插件）接口，大多是内部插件，使用起来比较灵活

## webpack原理
webpack 的核心原理就是通过分析 JavaScript 中的 require 语句，分析出当前 JavaScript 文件所有的依赖文件，
然后递归分析之后，就得到了整个项目的一个依赖图。
对图中不同格式的文件执行不同的 loader，比如会把 CSS 文件解析成加载 CSS 标签的 JavaScript 代码，
最后基于这个依赖图获取所有的文件。

进行打包处理之后，放在内存中提供给浏览器使用，然后 dev-server 会启动一个测试服务器打开页面，
并且在代码文件修改之后可以通过 WebSocket 通知前端自动更新页面，也就是我们熟悉的热更新功能。

## webpack的核心概念
webpack的核心概念分为: 入口(Entry)、加载器(Loader)、插件(Plugins)、出口(Output);​
- 入口(Entry)：入口起点告诉 webpack 从哪里开始，并根据依赖关系图确定需要打包的文件内容
- 加载器(Loader)：webpack 将所有的资源（css, js, image 等）都看做模块，但是 webpack 能处理的只是 JavaScript，因此，需要存在一个能将其他资源转换为模块，让 webpack 能将其加入依赖树中的东西，它就是 loader。
loader用于对模块的源代码进行转换。loader 可以使你在 import 或”加载”模块时预处理文件。
loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。
```
rules: [
 {
 test: /\.(js|jsx)$/,
 use: 'babel-loader'
 }
]
```
 
- 插件(Plugins)：loader 只能针对某种特定类型的文件进行处理，而 plugin 的功能则更为强大。在 plugin 中能够介入到整个 webpack 编译的生命周期，Plugins用于解决 loader 无法实现的其他事情，也就是说loader是预处理文件，那plugin 就是后处理文件。
对loader打包后的模块文件（bundle.js）进行二次优化处理，例如：代码压缩从而减小文件体积
提供辅助开发的作用：例如：热更新（浏览器实时显示）

```
plugins: [
 new webpack.optimize.UglifyJsPlugin(),
 new HtmlWebpackPlugin({template: './src/index.html'})
]
```
