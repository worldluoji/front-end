# postMessage
window.postMessage() 方法可以安全地实现跨域通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为 https），端口号（443 为 https 的默认值），以及主机 (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

通过postMessage，可以实现：
- 浏览器不同tab页之间通信
- 与iframe通信
- 与Native通信

## 语法
```js
otherWindow.postMessage(message)
otherWindow.postMessage(message, targetOrigin)
otherWindow.postMessage(message, targetOrigin, transfer)

otherWindow.postMessage(message, options)
```
**otherWindow**

其它窗口的一个引用，比如 iframe 的 contentWindow 属性、执行window.open返回的窗口对象。
实际就是发到otherWindow, 然后otherWindow就可以通过监听 message事件对消息进行处理。
```js
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  // For Chrome, the origin property is in the event.originalEvent
  // object.
  // 这里不准确，chrome 没有这个属性
  // var origin = event.origin || event.originalEvent.origin;
  var origin = event.origin;
  if (origin !== "http://example.org:8080") return;

  // ...
}
```

**targetOrigin**

通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个 URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 targetOrigin 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用 postMessage 传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的 origin 属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的 targetOrigin，而不是 *。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。

## 示例
**two-page** 两个页面间通过postMessage进行交互

## reference
- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
- https://juejin.cn/post/7294425916549152783?searchId=20240616180900E36608F8E33497BA71DC