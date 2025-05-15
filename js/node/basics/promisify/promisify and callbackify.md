# promisify and callbackify

## promisify
Node.js 内置的 util 模块有一个 promisify() 方法，该方法将基于回调的函数转换为基于 Promise 的函数。
这使您可以将 Promise 链和 async/await 与基于回调的 API 结合使用。

---

## callbackify
util.callbackify(original) 将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数，
例如将 (err, value) => ... 回调作为最后一个参数。

---

## 示例
-> [demo](./promisify.js)