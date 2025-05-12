# Web Worker
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

<br>

## API
### (1) 主线程
浏览器原生提供Worker()构造函数，用来供主线程生成 Worker 线程。
```
var myWorker = new Worker(jsUrl, options);
```
Worker()构造函数，可以接受两个参数。
- 第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。
- 第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

```
// 主线程
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker
```
Worker()构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下。
- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。

### (2) Worker 线程
Web Worker 有自己的全局对象，不是主线程的window，而是一个专门为 Worker 定制的全局对象。因此定义在window上面的对象和方法不是全部都可以使用。

Worker 线程有一些自己的全局属性和方法：
- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定message事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.close()：关闭 Worker 线程。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.importScripts()：加载 JS 脚本。


<br>

## Web Worker 有以下几个使用注意点

（1）同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）DOM 限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

（3）通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

（4）脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（5）文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

<br>

## 基本用法
### 主线程
1. 主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。
```
var worker = new Worker('work.js');
```
Worker()构造函数的参数是一个脚本文件，该文件就是**Worker 线程所要执行的任务**。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。

2. 主线程调用worker.postMessage()方法，向 Worker 发消息。
```
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

3. 接着，主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。
```
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
```
上面代码中，事件对象的**data属性可以获取 Worker 发来的数据**。

Worker 完成任务以后，主线程就可以把它关掉。
```
worker.terminate();
```

### Worker 线程
Worker 线程内部需要有一个监听函数，监听message事件。
```javascript
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);
```
上面代码中，self代表子线程自身，即子线程的全局对象。

除了使用self.addEventListener()指定监听函数，也可以使用self.onmessage指定。监听函数的参数是一个事件对象，它的data属性包含主线程发来的数据。self.postMessage()方法用来向主线程发送消息。

据主线程发来的数据，Worker 线程可以调用不同的方法，下面是一个例子。
```javascript
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```
上面代码中，self.close()用于在 Worker 内部关闭自身。


### Worker 加载脚本
Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。
```
importScripts('script1.js', 'script2.js');
```

## 错误处理
主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
```javascript
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```
Worker 内部也可以监听error事件。

## 关闭 Worker
使用完毕，为了节省系统资源，必须关闭 Worker。
```javascript
// 主线程
worker.terminate();

// Worker 线程
self.close();
```

## 数据通信
前面说过，主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。

```javascript
// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
  postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
};
```
但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做Transferable Objects。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。
```javascript
// Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
```

## 同页面的 Web Worker
通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

```javascript
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
```
上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的type属性是一个浏览器不认识的值，上例是app/worker。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

```javascript
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```
上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

<br>

## 实例：Worker 线程完成轮询
有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```javascript
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```
上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。

在 Web Workers 的上下文中，`createWorker` 函数的主要目的是动态生成一个包含特定功能的 Worker。这里使用 `Blob` 和 `window.URL.createObjectURL` 是为了将函数的源代码转换成一个可以由 `Worker` 构造函数使用的 URL。让我们逐个部分解释为什么这样做：

### Blob 对象

`Blob` 对象表示一个不可变的、原始数据的类文件对象。浏览器中的 Blob 可以表示文本、二进制数据或者文件，它是 `File` 接口的基础，`File` 接口继承了 `Blob` 的特性并添加了一些额外的方法和属性。

在 `createWorker` 函数中，`Blob` 被用来创建一个包含函数源码的二进制大对象。函数源码被转换为字符串形式，然后包裹在立即执行的函数表达式（IIFE）中，即 `'(' + f.toString() +')()'`。这确保了函数在 Worker 内部作为一个独立的作用域执行，而不是作为全局作用域的一部分。

```javascript
var blob = new Blob(['(' + f.toString() +')()']);
```

### window.URL.createObjectURL

`window.URL.createObjectURL` 方法用于创建一个表示指定 Blob 对象的 URL。这个 URL 是一个只读的字符串，可以像普通 URL 一样被使用，但是它引用的是一个 Blob 对象，而不是一个文件系统上的文件。

在 `createWorker` 函数中，这个 URL 被用来初始化一个新的 `Worker` 对象：

```javascript
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);
```

这样做的原因是，`Worker` 构造函数要求一个 URL 参数，这个 URL 指向一个包含 Worker 代码的脚本文件。由于我们希望动态生成 Worker 代码，所以我们不能提前知道脚本的确切位置。通过使用 `Blob` 和 `createObjectURL`，我们可以即时创建一个虚拟的 URL，指向包含函数源码的 Blob。

这种方法的一个主要优势是灵活性和动态性。我们可以随时创建新的 Worker 并加载不同的函数，而不需要事先编写并部署脚本文件。此外，这种方法还避免了跨域限制，因为生成的 Blob URL 总是与当前文档的起源相同。


通过使用 `Blob` 和 `window.URL.createObjectURL`，`createWorker` 函数能够创建一个动态的、包含特定函数的 Worker，而无需实际的文件系统路径或预编译的脚本文件。这为开发提供了很大的灵活性，特别是在需要动态生成或更改 Worker 行为的场景下。不过，需要注意的是，一旦不再需要 Worker 或者 Blob URL，应该使用 Worker.terminate()和 `window.URL.revokeObjectURL` 方法来释放资源，避免内存泄漏。