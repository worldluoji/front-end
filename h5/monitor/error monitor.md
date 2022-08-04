# error monitor
前端监控的基本原理其实就是window.onerror和try...catch到error后上报，具体参考：

 - https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event level1 （error event）
 - https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror level2 (怎么捕获错误)
 - https://blog.sentry.io/2016/05/17/what-is-script-error level2 （错误上报后总是会发现 Script Error. 咋办）
 - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch level1 （try catch）
 - https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event level1 （Promise reject）