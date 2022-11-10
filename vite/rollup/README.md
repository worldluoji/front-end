# rollup demo

rollup.js 的开发本意，是打造一款简单易用的 ES 模块打包工具，不必配置，直接使用。这一点，它确实做到了。

后来经过不断发展，它也可以打包 CommonJS 模块。但是，这时需要经过复杂配置，实际上并没有比 Webpack 简单多少。

因此建议，只把 rollup.js 用于打包 ES 模块，这样才能充分发挥它的优势。下面你会看到，那是多么简单的一件事。

如果你的项目使用 CommonJS 模块，不推荐使用 rollup.js，优势不大。


## 安装rollup
```
npm install -g rollup
```
但是，你也可以不安装直接使用，就是把下面所有命令中的rollup，替换成npx rollup

查看rollup帮助：
```
$ rollup --help
# 或者
$ npx rollup --help
```

## rollup打包
```
rollup main.js
```

可以看到，import和export语句都没了，被换成了原始代码。

另外，函数addE()没有打包进去，因为没有用到它。这种特性叫做摇树（tree-shaking），即打包时自动删除没有用到的代码。

由于上面两点，rollup 输出的代码非常整洁，而且体积小于其他打包工具。

## 使用注意点
（1）如果有多个入口脚本，就依次填写它们的文件名，并使用参数--dir指定输出目录。
```
$ rollup m1.js m2.js --dir dist
```
上面命令会在目录dist，打包生成多个文件：m1.js、m2.js、以及它们共同的依赖项（如果有的话）。

（2）参数--format iife，会把打包结果放在一个自动执行函数里面。

```
$ rollup main.js --format iife
```

（3）如果希望打包后代码最小化，使用参数--compact。
```
$ rollup main.js --compact
```

另一种方法是使用专门工具。
```
$ rollup main.js | uglifyjs --output bundle.js
```
上面命令分成两步，第一步是 rollup 打包，第二步是 uglifyjs 进行代码最小化，最后写入 bundle.js。

（4）rollup 支持使用配置文件（rollup.config.js），把参数都写在里面，下面是一个例子。

```
// rollup.config.js
export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'es'
  }
};
```
参数-c启用配置文件。
```
$ rollup -c
```
不推荐使用配置文件，这样会增加额外的复杂性。默认场景下，命令行参数已经够用了，也更容易阅读。

## 转成 CommonJS 模块
最后，rollup 还支持 ES 模块转成 CommonJS 模块，使用参数--format cjs就可以了。
```
$ rollup add.js --format cjs
```

## rollup-plugin-visualizer分析vite工程代码文件大小
npm install 安装插件 rollup-plugin-visualizer。使用这个插件后，我们就可以获取到代码文件大小的报告了。

之后，进入到 vite.config.js 这个文件中，新增下列代码，就可以在 Vite 中加载可视化分析插件:
```
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  plugins: [vue(),vueJsx(), visualizer()],
})
```
我们在项目的根目录下执行 npm run build 命令后，项目就把项目代码打包在根目录的 dist 目录下，并且根目录下多了一个文件 stat.html。
打开这个 stat 文件, 里面就能看到各个模块的体积，就可以按需优化。