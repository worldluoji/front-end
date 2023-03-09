# Node.js
Node.js is the server-side JavaScript runtime environment. 
Node.js is built on top of the Google Chrome V8 JavaScript engine, 
and it's mainly used to create web servers - but it's not limited to just that.

<br>

## Node.js和Browser的不同点
1. DOM、Cookie等操作在Node中不存在
2. Node比浏览器更新快，新的ES功能能够早用
3. Node同时支持 CommonJS and ES module
   
reference: https://nodejs.dev/en/learn/differences-between-nodejs-and-the-browser/

<br>

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

<br>

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

<br>

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
