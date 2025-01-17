# react如何确定浏览器是否是空闲时间
React 18.2的[实现](https://github.com/facebook/react/blob/v18.2.0/packages/scheduler/src/forks/Scheduler.js)如下：
```js
// 记录 callback
let scheduledHostCallback;
let isMessageLoopRunning = false;
let getCurrentTime = () => performance.now();
let startTime;

// rIC 更名为 requestHostCallback
function requestHostCallback(callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    schedulePerformWorkUntilDeadline();
  }
}

const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

let schedulePerformWorkUntilDeadline = () => {
  port.postMessage(null);
};

function performWorkUntilDeadline() {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime();
    startTime = currentTime;
    const hasTimeRemaining = true;
    
    let hasMoreWork = true;
    try {
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
    } finally {
      if (hasMoreWork) {
        schedulePerformWorkUntilDeadline();
      } else {
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      }
    }
  } else {
    isMessageLoopRunning = false;
  }
};
```
requestHostCallback 函数执行的时候，会调用 schedulePerformWorkUntilDeadline ，它只做了一件事情，就是 postMessage，通知浏览器等忙完自己的事情，再执行 performWorkUntilDeadline。

performWorkUntilDeadline 中会执行 **scheduledHostCallback(hasTimeRemaining, currentTime)**，scheduledHostCallback 就是传入 requestHostCallback 的 callback 函数，它返回一个布尔值告诉 performWorkUntilDeadline 是否还有更多任务，如果有，那就调用 schedulePerformWorkUntilDeadline，告诉浏览器等会再接着干，由此实现了任务小量执行，不断让出线程，从而保证浏览器能够及时处理动画或者用户输入。

[MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel) 接口允许我们创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据，使用示例如下：
```js
var channel = new MessageChannel();

channel.port1.onmessage = (e) => {console.log(e.data)}

channel.port2.postMessage('Hello World')
```

## scheduledHostCallback 到底是什么
我们可以知道它就是调用 requestHostCallback 时传入的函数，但这个被传入的函数执行的内容是什么呢？

会发现 requestHostCallback 虽然有三处被调用，但传入的函数都是 flushWork 这个函数：
```js
requestHostCallback(flushWork);
```

flushWork简化后函数如下：
```js
function flushWork(hasTimeRemaining, initialTime) {
   return workLoop(hasTimeRemaining, initialTime);
}

var currentTask;

function workLoop(hasTimeRemaining, initialTime) {
  currentTask = taskQueue[0];
  while (currentTask != null) {
    if (
      currentTask.expirationTime > initialTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      break;
    }
    
    const callback = currentTask.callback;
    callback();

    taskQueue.shift()

    currentTask = taskQueue[0];
  }
  if (currentTask !== null) {
    return true;
  } else {
    return false;
  }
}

// 默认的时间切片
const frameInterval = 5;

function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    return false;
  }

  return true;
}
```
- 在 flushWork 中，调用的是 workLoop 函数
- 在 workLoop 中，取出任务列表中的第一个任务，然后判断任务是否过期，以及是否应该让出线程（shouldYieldToHost）
- 在 shouldYieldToHost 中，getCurrentTime() 表示当前的时间，startTime 我们是在收到 postMessage 的消息时执行 performWorkUntilDeadline 函数的时间


可以看到，React 把 React 的更新操作做成了一个个任务，塞进了 taskQueue，也就是任务列表，如果直接遍历执行这个任务列表，纯同步操作，执行期间，浏览器无法响应动画或者用户的输入，于是借助 MessageChannel，依然是遍历执行任务，但当每个任务执行完，就会判断过了多久，如果没有过默认的切片时间（5ms），那就再执行一个任务，如果过了，那就调用 postMessage，让出线程，等浏览器处理完动画或者用户输入，就会执行 onmessage 推入的任务，接着遍历执行任务列表。


## reference
https://juejin.cn/post/7167335700424196127