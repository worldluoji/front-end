# Node.js
Node.js is the server-side JavaScript runtime environment. 
Node.js is built on top of the Google Chrome V8 JavaScript engine, 
and it's mainly used to create web servers - but it's not limited to just that.

Node.js 并不是语言，而是一个 JavaScript 运行时环境，它的语言是 JavaScript。

![node-hierarchy](./assets/node-hierarchy.awebp)

---

## Node.js和Browser的不同点
- DOM、Cookie 等操作在 Node 中不存在
- Node比浏览器更新快，新的ES功能能够早用
- Node同时支持 CommonJS and ES module（最新的趋势是只支持ES module）
   
reference: https://nodejs.dev/en/learn/differences-between-nodejs-and-the-browser/

---

## Node.js 与 Web-interoperable Runtime
Web-interoperable Runtime 简称 Winter，Web 可互操（cāo）运行时。这里有一个核心的单词叫 interoperable，就是可互操。
什么是可互操？就是运行时之间是可以互相替代、互相兼容的。各种浏览器之间就是 interoperable，经过标准化之后，大家 API 长的都一样，这就是所谓的互通性。

Winter 就是针对服务端 JavaScript 提出的一种规范。只要大家都遵循了 Winter 规范，那么整个生态又是可共享的。
因为好多厂商都基于 V8 做了 JavaScript 的运行时，但是后来经过标准化、规范化之后，国际上的几家厂商就一起给它起了一个新的名字，
并且开始做一些标准化的事情，组建了一个组织叫做 WinterCG（Web-interoperable Runtimes Community Group），它是由几家国际公司联合起来搞的 W3C 下的一个社区组，致力于做 Web-interoperable Runtime 标准化。

大家可以在 [WinterCG 的官网首页](https://wintercg.org)上看有哪几个公司正在遵循 Winter 的标准做他们的运行时，如下图所示：

---

## Node.js with V8
V8 is the name of the JavaScript engine that powers Google Chrome. 
It's the thing that takes our JavaScript and executes it while browsing with Chrome.

V8 is the JavaScript engine i.e. it parses and executes JavaScript code. 
The DOM, and the other Web Platform APIs (they all makeup runtime environment) are provided by the browser.

The cool thing is that the JavaScript engine is independent of the browser in which it's hosted. 
This key feature enabled the rise of Node.js. 
V8 was chosen to be the engine that powered Node.js back in 2009, 
and as the popularity of Node.js exploded, V8 became the engine that now powers an incredible amount of server-side code written in JavaScript.

The Node.js ecosystem is huge and thanks to V8 which also powers desktop apps, 
with projects like Electron.

Node.js与v8版本的对应关系：
```
node -p process.versions.v8
```

---

## The difference between development and production
Node.js assumes it's always running in a development environment. 
You can signal Node.js that you are running in production by setting the NODE_ENV=production environment variable.
```
export NODE_ENV=production
```
You can also apply the environment variable by prepending it to your application initialization command:
```
NODE_ENV=production node app.js
```
Then in an Express app, you can use this to set different error handlers per environment:
```
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```

---

## Node.js单线程的问题
在 Node.js 环境里，默认单线程执行程序。
虽然单线程管理简单，但是因为只有一个“执行单元”，Node.js 服务中一旦出现密集计算的过程，就容易导致阻塞问题，导致并发问题。
这类 Web 服务的密集计算场景很常见。

Node.js中可以利用多进程或多线程来缓解该问题。

关于 Node.js 的性能优化，也可以归纳成两个方面，CPU 密集计算优化和机器资源使用优化。
1. CPU 密集计算优化方面：优先尽量少做密集计算逻辑，根据功能最小需求，按需计算。如果真的避免不了密集计算，可以选择 Node.js 环境提供的多线程模块进行密集计算。
2. 机器资源优化方面：如果机器条件允许，可以尽量使用多线程来启动服务程序，保证机器资源的充分利用。

一般来说，在大并发的场景，我们一般不会选择 Node.js,而应该使用Go、Java。
Node.js一般用于中间层或者非大并发的场景。


## Node.js 命令
除了常用的
```shell
node my.js
```
默认情况下，进程的标准输入输出都绑定到运行的命令行环境上。但实际上，标准输入输出有丰富的利用方式。最基本的方法是重定向输入输出到文件。
```shell
node my.js > output.txt < input.txt
```
- > output.txt：将 my.js 的标准输出（stdout）重定向到 output.txt。
- < input.txt：将 input.txt 的内容作为标准输入（stdin）传递给 my.js。
- 在 my.js 中，可以通过 process.stdin 或 readline 模块读取输入内容。

我们还可以利用 | 运算，把一个程序的标准输出给到另一个程序的标准输入：
```shell
node my1.js | node my2.js
```