# AbortController
The AbortController interface represents a controller object that allows you to abort one or more DOM requests as and when desired.

AbortController 是 JavaScript 中的一个全局类，可以用来中止任何事情。

```js
const controller = new AbortController();
controller.signal
controller.abort()
```
- signal 属性: 一个 AbortSignal 的实例，可以提供给各种 API （ 比如 fetch ） 来响应中止事件
- abort() 方法：触发 signal 上的中止事件

## 1. 通义清理事件监听
```js
const controller = new AbortController()
const signal = controller.signal

window.addEventListener('resize',
  () => {
    // 处理 resize 事件
  },
  { signal }
)

window.addEventListener('storage',
  () => {
    // 处理 storage 事件
  },
  { signal }
)

// 清理时只需要调用 abort 方法
controller.abort()
```
即使存在多个事件监听器，在移除的时候，我们也只需要一个 AbortController 实例就能统一清理。
这等价于
```js
window.removeEventListener('resize', handleResize)
window.removeEventListener('storage', handleStorage)
```

## 2. 取消网络请求
```js
function uploadFile(file: File) {
  const controller = new AbortController()

  const response = fetch('/upload', {
    method: 'POST',
    body: file,
    signal: controller.signal,
  })

  return { response, abort: controller.abort }
}
```
用户上传文件的过程中，如果想要取消上传，只需要调用 abort 方法即可。

## 3. 设置请求超时时间
```js
fetch(url, {
  signal: AbortSignal.timeout(3000),
})
```
在使用 fetch 时，如果想要设置超时后取消请求，无需创建 AbortController 实例，直接使用 AbortSignal.timeout 即可。


## 4. AbortSignal.any
AbortSignal.any 可以监听多个信号，只要其中一个信号触发，就会触发 AbortSignal.any 的回调。
```js
const publicController = new AbortController()
const internalController = new AbortController()

channel.addEventListener('message', handleMessage, {
  signal: AbortSignal.any([publicController.signal, internalController.signal]),
})
```
只要任何一个 AbortController 实例触发中止事件， message 事件监听器就会被删除。


## 5. reason
controller.abort() 方法有一个可选参数，可以传递一个错误信息，这个错误信息会作为 AbortSignal.reason 属性返回。
```js
const controller = new AbortController()

controller.signal.addEventListener('abort', () => {
  console.log(controller.signal.reason) // "user cancellation"
})

// 提供一个错误信息
controller.abort('user cancellation')
```


## reference
https://juejin.cn/post/7461790584040603686