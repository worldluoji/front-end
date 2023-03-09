# Koa.js
Koa.js，它核心的分析服务设计理念，就是处理 HTTP 请求的中间件流程设计，也就是“洋葱模型”。

Koa.js中，每个异步处理函数，都是一个中间件，执行时候“先进后出”。其实，每个中间件，都等于一个 Promise。
所谓的洋葱模型中间件，就是 Promise 嵌套。“先进后出”的效果就是 Promise 嵌套中 resolve 前后控制。

Koa.js 可以通过找对应的中间件，来实现对应功能：
- 中间件 koa-router 处理路由；
- 中间件 koa-static 处理静态资源，同时，用 koa-mount 来辅助处理静态资源的 URL 前缀；
- Koa.js 自带的 Context 控制渲染 HTML 和处理 API。

Koa.js 本身框架极其简单，虽然只提供了 HTTP 请求和相应的处理能力，
但是由于中间件模型灵活度高，可以控制整个 HTTP 的请求和相应过程，提供了很强的扩展能力，经过近七八年的沉淀，积累了很多功能中间件。
开发者可以基于 Koa.js 选择对应功能的中间件，来实现 Web 服务所需要的功能。
    
常用目录结构：
```
.
├── controller/*
├── public/*
├── service/*
├── template/*
├── util/*
├── router.ts
└── index.ts
```