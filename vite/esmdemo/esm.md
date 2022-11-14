# ESM的一些概念
## 什么是 Pure ESM ? 
Pure ESM 最初是在 Github 上的一个帖子中被提出来的，其中有两层含义，
- 一个是让 npm 包都提供 ESM 格式的产物
- 另一个是仅留下 ESM 产物，抛弃 CommonJS 等其它格式产物
  
当这个概念被提出来之后社区当中出现了很多不同的声音，有人赞成，也有人不满。
但不管怎么样，社区中的很多 npm 包已经出现了 ESM First 的趋势，
可以预见的是越来越多的包会提供 ESM 的版本，来拥抱社区 ESM 大一统的趋势，
同时也有一部分的 npm 包做得更加激进，直接采取Pure ESM模式，如大名鼎鼎的chalk和imagemin，最新版本中只提供 ESM 产物，而不再提供 CommonJS 产物。

<br>

## Node使用EMS说明
在 Node.js 中(>=12.20 版本)有一般如下几种方式可以使用原生 ES Module:
- 文件以 .mjs 结尾；
- package.json 中声明type: "module"。

如何导出一个包？你有两种方式可以选择: main和 exports属性。

这两个属性均来自于package.json，并且 exports 的优先级比 main 更高。

main 的使用比较简单，设置包的入口文件路径即可，如:
```
"main": "./dist/index.js"
```

exports属性，它包含了多种导出形式: 默认导出、子路径导出和条件导出:
```
{
  "name": "package-a",
  "type": "module",
  "exports": {
    // 默认导出，使用方式: import a from 'package-a'
    ".": "./dist/index.js",
    // 子路径导出，使用方式: import d from 'package-a/dist'
    "./dist": "./dist/index.js",
    "./dist/*": "./dist/*", // 这里可以使用 `*` 导出目录下所有的文件
    // 条件导出，区分 ESM 和 CommonJS 引入的情况
    "./main": {
      "import": "./main.js",
      "require": "./main.cjs"
    },
  }
}
```
具体可参考node官网： https://nodejs.org/api/packages.html#conditional-exports

再来看看"导入"，也就是 package.json 中的 imports字段，一般是这样声明的:
```
{
  "imports": {
    // key 一般以 # 开头
    // 也可以直接赋值为一个字符串: "#dep": "lodash-es"
    "#dep": {
      "node": "lodash-es",
      "default": "./dep-polyfill.js"
    },
  },
  "dependencies": {
    "lodash-es": "^4.17.21"
  }
}
```

这样你可以在自己的包中使用下面的 import 语句:

// index.js
import { cloneDeep } from "#dep";

const obj = { a: 1 };

// { a: 1 }
console.log(cloneDeep(obj));
```
// index.js
import { cloneDeep } from "#dep";

const obj = { a: 1 };

// { a: 1 }
console.log(cloneDeep(obj));
```
Node.js 在执行的时候会将#dep定位到lodash-es这个第三方包，当然，你也可以将其定位到某个内部文件。
这样相当于实现了路径别名的功能，不过与构建工具中的 alias 功能不同的是，"imports" 中声明的别名必须全量匹配，
否则 Node.js 会直接抛错。

<br>

## tsup
tsup 是一个基于 Esbuild 的基础库打包器，主打无配置(no config)打包。
借助它我们可以轻易地打出 ESM 和 CommonJS 双格式的产物，并且可以任意使用与模块格式强相关的一些全局变量或者 API.

可参考： https://github.com/sanyuan0704/juejin-book-vite/tree/main/18-esm-advanced/tsup-demo