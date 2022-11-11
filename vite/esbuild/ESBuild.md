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