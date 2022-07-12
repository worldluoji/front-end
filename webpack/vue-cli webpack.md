# vue-cli webpack

## 1. 简单的配置方式
调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
```
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
该对象将会被 webpack-merge 合并入最终的 webpack 配置。

如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：

```
// vue.config.js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```


## 2. 链式操作 (高级)
Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，
并有机会在后期进入这些规则并对它们的选项进行修改。

它允许我们更细粒度的控制其内部配置。
接下来有一些常见的在 vue.config.js 中的 chainWebpack 修改的例子。

修改 Loader 选项
```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}

添加一个新的 Loader
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      // 你还可以再添加一个 loader
      .use('other-loader')
        .loader('other-loader')
        .end()
  }
}
```

替换一个规则里的 Loader#
如果你想要替换一个已有的基础 loader，例如为内联的 SVG 文件使用 vue-svg-loader 而不是加载这个文件：
```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}

修改插件选项#
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* 传递给 html-webpack-plugin's 构造函数的新参数 */]
      })
  }
}
```

你需要熟悉 webpack-chain 的 API 并阅读一些源码以便了解如何最大程度利用好这个选项，
但是比起直接修改 webpack 配置，它的表达能力更强，也更为安全。

webpack-chain API: https://github.com/neutrinojs/webpack-chain#getting-started

比方说你想要将 index.html 默认的路径从 /Users/username/proj/public/index.html 改为 /Users/username/proj/app/templates/index.html。通过参考 html-webpack-plugin 你能看到一个可以传入的选项列表。我们可以在下列配置中传入一个新的模板路径来改变它：

```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = '/Users/username/proj/app/templates/index.html'
        return args
      })
  }
}
```

## 3. vue inspect 确认变更

@vue/cli-service 对 webpack 配置进行了抽象，所以理解配置中包含的东西会比较困难，尤其是当你打算自行对其调整的时候。

vue-cli-service 暴露了 inspect 命令用于审查解析好的 webpack 配置。
那个全局的 vue 可执行程序同样提供了 inspect 命令，这个命令只是简单的把 vue-cli-service inspect 代理到了你的项目中。

该命令会将解析出来的 webpack 配置、包括链式访问规则和插件的提示打印到 stdout。

你可以将其输出重定向到一个文件以便进行查阅：

vue inspect > output.js

注意它输出的并不是一个有效的 webpack 配置文件，而是一个用于审查的被序列化的格式。

你也可以通过指定一个路径来审查配置的一小部分：

只审查第一条规则
```
vue inspect module.rules.0
```

或者指向一个规则或插件的名字：
```
vue inspect --rule vue
vue inspect --plugin html
```

最后，你可以列出所有规则和插件的名字：
```
vue inspect --rules
vue inspect --plugins
```
/node_modules/@vue/cli-service/webpack.config.js
该文件会动态解析并输出 vue-cli-service 命令中使用的相同的 webpack 配置，包括那些来自插件甚至是你自定义的配置。


## 例子
（1）npm install awesome-typescript-loader --save-dev  该插件支持将ts转化为js
（2）在vue.config.js中配置该插件
```
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('tsRule')
      .test(/\.tsx?$/)
      .use('awesome-typescript-loader')
        .loader('awesome-typescript-loader')
        .end()
  }
})
```
（3）vue inspect > output.js
可以在output.js中看到awesome-typescript-loader已经引入


## 参考资料
- https://cli.vuejs.org/zh/guide/webpack.htm
