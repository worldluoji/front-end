# Fetch
Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，例如  Service Workers。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展。

## fetch使用
```
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```
这里我们通过网络获取一个 JSON 文件并将其打印到控制台。最简单的用法是只提供一个参数用来指明想 fetch() 到的资源路径，然后返回一个包含响应结果的 promise（一个 Response 对象）。

post请求示例：
```
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});
```

mode属性指定请求的模式。可能的取值如下：
- cors：默认值，允许跨域请求。
- same-origin：只允许同源请求。
- no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

## 为什么有了xhr，还要fetch?
XHR 和 fetch API 都是浏览器给上层使用者暴露出来的 API（类似于操作系统暴露系统 API 给浏览器这类应用一样）。这两套暴露的 API 给上层使用者提供了部分操作 http 包的能力。换句话说，这两者都是建立在 http 协议上的，我们可以将其当成具有部分功能的 http 客户端。

XHR解决了局部渲染的问题，但XHR一次请求中，XHRhttp request 、http response 和事件监听都处于同一个 xhr 实例里面。整个代码组织缺少语义化，并且可能陷入回调地狱的窘境。如果没有各种包装库的实现（这也同样是 fetch API 出现后难以推广的原因之一，因为库封装的很好），手写 xhr 绝对是个痛苦的事情。

fetch API 在设计时主要考虑点在哪里？
- 使用最新的 Promise 语法结构，对上层用户编程更加友好
- 整个设计更加底层，这意味着在实际使用过程当中能够进行更多的弹性设计
- 关注点分离，request / response / header 分开，这也意味着能够更加灵活的使用这些 API

## 参考
- https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
- https://juejin.cn/post/6847009771170562062
- https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html