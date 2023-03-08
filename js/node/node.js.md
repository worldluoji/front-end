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