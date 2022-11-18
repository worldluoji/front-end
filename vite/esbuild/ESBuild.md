# ESBuild
Esbuild 是由 Figma 的 CTO 「Evan Wallace」基于 Golang 开发的一款打包工具，相比传统的打包工具，主打性能优势，在构建速度上可以比传统工具快 10~100 倍。
那么，它是如何达到这样超高的构建性能的呢？主要原因可以概括为 4 点:
- 使用 Golang 开发，构建逻辑代码直接被编译为原生机器码，而不用像 JS 一样先代码解析为字节码，然后转换为机器码，大大节省了程序运行时间。
- 多核并行。内部打包算法充分利用多核 CPU 优势，所有的步骤尽可能并行，这也是得益于 Go 当中多线程共享内存的优势。
- 从零造轮子。 几乎没有使用任何第三方库，所有逻辑自己编写，大到 AST 解析，小到字符串的操作，保证极致的代码性能。
- 高效的内存利用。Esbuild 中从头到尾尽可能地复用一份 AST 节点数据，而不用像 JS 打包工具中频繁地解析和传递 AST 数据（如 string -> TS -> JS -> string)，造成内存的大量浪费。

## ESBuild使用
使用 Esbuild 有 2 种方式，分别是 命令行调用和代码调用。

首先都需要安装esbuild
```
npm i esbuild 
```

 <br>

## 命令行调用
package.json中添加build脚本:
```
 "scripts": {
    "build": "./node_modules/.bin/esbuild src/index.jsx --bundle --outfile=dist/out.js"
 },
```
src/index.jsx是要打包的入口文件，--outfile是指定打包后的文件。

然后使用如下命令打包即可：
```
npm run build
```

但命令行的使用方式不够灵活，只能传入一些简单的命令行参数，稍微复杂的场景就不适用了，所以一般情况下我们还是会用代码调用的方式。

<br>

## 代码调用方式
Esbuild 对外暴露了一系列的 API，主要包括两类: Build API和Transform API，
我们可以在 Nodejs 代码中通过调用这些 API 来使用 Esbuild 的各种功能。

### 项目打包——Build API
Build API主要用来进行项目打包，包括build、buildSync和serve三个方法。

见 build.js

buildSync方法的使用和build几乎相同，如下代码所示:
```
function runBuild() {
  // 同步方法
  const result = buildSync({
    // 省略一系列的配置
  });
  console.log(result);
}

runBuild();
```
但我并不推荐大家使用 buildSync 这种同步的 API，它们会导致两方面不良后果。
一方面容易使 Esbuild 在当前线程阻塞，丧失并发任务处理的优势。
另一方面，Esbuild 所有插件中都不能使用任何异步操作，这给插件开发增加了限制。

因此推荐使用build这个异步 API，它可以很好地避免上述问题。

在项目打包方面，除了build和buildSync，Esbuild 还提供了另外一个比较强大的 API——serve。这个 API 有 3 个特点:
- 开启 serve 模式后，将在指定的端口和目录上搭建一个静态文件服务，这个服务器用原生 Go 语言实现，性能比 Nodejs 更高。
- 类似 webpack-dev-server，所有的产物文件都默认不会写到磁盘，而是放在内存中，通过请求服务来访问。
- 每次请求到来时，都会进行重新构建(rebuild)，永远返回新的产物。

详见 buildserver.js

node buildserver.js, 我们在浏览器访问localhost:8000可以看到 Esbuild 服务器返回的编译产物

<br>

## 单文件转译——Transform API
它也包含了同步和异步的两个方法，分别是transformSync和transform

见 transform.js， 同样不建议使用同步方法。
出于性能考虑，Vite 的底层实现也是采用 transform这个异步的 API 进行 TS 及 JSX 的单文件转译的。

<br>

## Esbuild 插件开发
插件开发其实就是基于原有的体系结构中进行扩展和自定义。 
Esbuild 插件也不例外，通过 Esbuild 插件我们可以扩展 Esbuild 原有的路径解析、模块加载等方面的能力，并在 Esbuild 的构建过程中执行一系列自定义的逻辑。
Esbuild 插件结构被设计为一个对象，里面有name和setup两个属性，name是插件的名称，setup是一个函数，
其中入参是一个 build 对象，这个对象上挂载了一些钩子可供我们自定义一些钩子函数逻辑。

build.js中，envPlugin就是一个插件定义的例子。

<br>

## 钩子函数的使用
1. onResolve 钩子 和 onLoad钩子

在 Esbuild 插件中，onResolve 和 onload是两个非常重要的钩子，分别控制路径解析和模块内容加载的过程。

首先，我们来说说上面插件示例中的两个钩子该如何使用。
```
build.onResolve({ filter: /^env$/ }, args => ({
  path: args.path,
  namespace: 'env-ns',
}));

build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
  contents: JSON.stringify(process.env),
  loader: 'json',
}));
```
可以发现这两个钩子函数中都需要传入两个参数: Options 和 Callback。

先说说Options。它是一个对象，对于onResolve 和 onload 都一样，包含filter和namespace两个属性，类型定义如下:
```
interface Options {
  filter: RegExp;
  namespace?: string;
}
```
filter 为必传参数，是一个正则表达式，它决定了要过滤出的特征文件。
插件中的 filter 正则是使用 Go 原生正则实现的，为了不使性能过于劣化，规则应该尽可能严格。同时它本身和 JS 的正则也有所区别，不支持前瞻(?<=)、后顾(?=)和反向引用(\1)这三种规则。

namespace 为选填参数，一般在 onResolve 钩子中的回调参数返回namespace属性作为标识，
我们可以在onLoad钩子中通过 namespace 将模块过滤出来。

如上述插件示例就在onLoad钩子通过env-ns这个 namespace 标识过滤出了要处理的env模块。

还有一个回调参数 Callback，它的类型根据不同的钩子会有所不同。相比于 Options，Callback 函数入参和返回值的结构复杂得多，涉及很多属性。不过，我们也不需要看懂每个属性的细节，先了解一遍即可，常用的一些属性会在插件实战部分讲解来讲。

在 onResolve 钩子中函数参数和返回值梳理如下:
```
build.onResolve({ filter: /^env$/ }, (args: onResolveArgs): onResolveResult => {
  // 模块路径
  console.log(args.path)
  // 父模块路径
  console.log(args.importer)
  // namespace 标识
  console.log(args.namespace)
  // 基准路径
  console.log(args.resolveDir)
  // 导入方式，如 import、require
  console.log(args.kind)
  // 额外绑定的插件数据
  console.log(args.pluginData)
  
  return {
      // 错误信息
      errors: [],
      // 是否需要 external
      external: false;
      // namespace 标识
      namespace: 'env-ns';
      // 模块路径
      path: args.path,
      // 额外绑定的插件数据
      pluginData: null,
      // 插件名称
      pluginName: 'xxx',
      // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
      sideEffects: false,
      // 添加一些路径后缀，如`?xxx`
      suffix: '?xxx',
      // 警告信息
      warnings: [],
      // 仅仅在 Esbuild 开启 watch 模式下生效
      // 告诉 Esbuild 需要额外监听哪些文件/目录的变化
      watchDirs: [],
      watchFiles: []
  }
}
```
在 onLoad 钩子中函数参数和返回值梳理如下:
```
build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args: OnLoadArgs): OnLoadResult => {
  // 模块路径
  console.log(args.path);
  // namespace 标识
  console.log(args.namespace);
  // 后缀信息
  console.log(args.suffix);
  // 额外的插件数据
  console.log(args.pluginData);
  
  return {
      // 模块具体内容
      contents: '省略内容',
      // 错误信息
      errors: [],
      // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
      loader: 'json',
      // 额外的插件数据
      pluginData: null,
      // 插件名称
      pluginName: 'xxx',
      // 基准路径
      resolveDir: './dir',
      // 警告信息
      warnings: [],
      // 同上
      watchDirs: [],
      watchFiles: []
  }
});
```

2. 其他钩子
在 build 对象中，除了onResolve和onLoad，还有onStart和onEnd两个钩子用来在构建开启和结束时执行一些自定义的逻辑，使用上比较简单，如下面的例子所示:
```
let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('build started')
    });
    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return;
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事情，比如生成 HTML
      console.log(buildResult.metafile)
    })
  },
}
```
在使用这些钩子的时候，有 2 点需要注意。
- onStart 的执行时机是在每次 build 的时候，包括触发 watch 或者 serve模式下的重新构建。
- onEnd 钩子中如果要拿到 metafile，必须将 Esbuild 的构建配置中metafile属性设为 true。