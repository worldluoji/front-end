## worker_threads
Node.js 在 worker_threads 模块出来之前，在用户层面是单线程的。

Node.js 有一条主事件循环，所有的 JavaScript 代码都是在主事件循环上按“同步代码”为粒度一整段一整段执行的。
```js
setTimeout(() => {
  console.log('a few moment later...');
}, 1000);

setTimeout(() => {
  console.log('a few moment later as well...');
});

console.log('right now');
```
如果这一段代码中有一段死循环卡住了,那么就会困死在当前 Tick 中，永远等不到下一个黎明:
-> [demo](./settimeout_dead_cycles.js)


worker Threads 让 Node.js 的开发者们拥有了利用多核 CPU 写逻辑的能力，这对于执行 CPU 密集型的 JavaScript 操作很有用。

worker_threads首次在Node.js v10.5.0作为实验性功能出现，需要命令行带上--experimental-worker才能使用。直到v12.11.0稳定版才能正式使用。

与 child_process 或 cluster 不同，worker_threads 可以共享内存。 它们通过传输 ArrayBuffer 实例或共享 SharedArrayBuffer 实例来实现。

由于以下特性，worker_threads已被证明是充分利用CPU性能的最佳解决方案：
- 运行具有多个线程的单个进程。
- 每个线程执行一个事件循环。
- 每个线程运行单个 JS 引擎实例。
- 每个线程执行单个 Node.js 实例。


worker_threads 通过执行主线程指定的脚本文件来工作。每个线程都在与其他线程隔离的情况下执行。

但是，这些线程可以通过<strong>消息通道</strong>来回传递消息。
主线程使用 worker.postMessage() 函数使用消息通道，而工作线程使用parentPort.postMessage()函数。

主事件循环中的 JavaScript 逻辑是一个 V8 的 Isolate 在执行。而每一个 Worker 线程都是一个新的 V8 Isolate 对象。

它们之间的内存堆栈完全没有关系。所以当任意线程调用 postMessage() 的时候，都是先将 JavaScript 对象序列化成某种格式，在接收端通过反序列化将该格式的内容重新组装成 JavaScript 对象。

所以 postMessage() 中<strong>发送端和接收端的两个数据块实际上就是两个副本</strong>——自然也不存在任何冲突、竞态的关系。

另外，Node.js 的 Worker Threads 的<strong>初始化是有一定成本的</strong>，它会重新走一遍 Node.js 的一些初始化流程，以构建一个全新的 V8 引擎沙箱环境——重新生成一个 V8 Isolate、上下文 Context 等，该初始化的内置模块等也全都重新在新的 V8 Isolate 中初始化一遍。

官方示例：
```js
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```
上述代码主线程与工作线程都使用同一份文件作为执行脚本(__filename为当前执行文件路径)，通过isMainThread来区分主线程与工作线程运行时逻辑。
当模块对外暴露方法parseJSAsync被调用时候，都将会衍生子工作线程去执行调用parse函数。

->[demo](./main.mjs)
