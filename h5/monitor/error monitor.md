# error monitor
1. 前端监控的基本原理其实就是window.onerror和try...catch到error后上报，具体参考：
 - https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event level1 （error event）
 - https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror level2 (怎么捕获错误)
 - https://blog.sentry.io/2016/05/17/what-is-script-error level2 （错误上报后总是会发现 Script Error. 咋办）
 - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch level1 （try catch）
 - https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event level1 （Promise reject）

2. unhandledrejection
当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event

## 总结
1. 同步错误 => 可以被 1.try...catch 2.window.addEventListener('unhandledrejection') 捕获

2. 异步错误 => 例如setInterval、没有被await的异步函数等，是不会被try...catch捕获的，但是会被window.addEventListener('unhandledrejection')捕获

3. Promise错误 => Promise.reject(new Error('some wrong'));像是这样的promise错误，使用window.addEventListener('unhandledrejection')捕获
