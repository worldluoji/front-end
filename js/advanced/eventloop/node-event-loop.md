# node event loop
JavaScript 的确是有一个基于事件循环的并发模型。但这以前是针对前端在 DOM 中进行操作的。
V8 自己有实现一套事件循环，但 Node.js 中的事件循环则是自己实现的。

与浏览器不同，作为能跑后端服务的 JavaScript 运行时，必须要有处理系统事件的能力。比如去处理各种文件描述符对应的读写事件。
一个最简单的事件循环的伪代码可如下：
```
while (还有事件在监听) {
  const events = 从监听中获取所有事件信息;
  for (const event of events) {
    处理(event);
  }
}
```
一个 setTimeout 可以是一个 Timer 事件，一个文件读写是一个系统的 I/O 事件。对于浏览器来说，通常是没有后者的。

Node.js 的事件循环基于 Ryan Dahl 自己开发的 libuv ，完成了自己的事件循环与异步 I/O。

libuv 是一个聚焦异步 I/O 的跨平台库。它的 API 也很简单，无非包含文件描述符的监听、读写、连接，以及定时器……以及因为它是个“网络层”，
自然要做各种网络请求，那么对于 DNS 的查询也是必要能力之一。

<br>

## 事件循环 ≠ 异步 I/O
为什么本章的标题不是“事件循环”，也不是“异步 I/O”，而是二者都要？因为这两者并不等价。
事件循环是一种并发模型，它的本质是一个死循环，在循环中不断处理到来的事件。
<strong>异步 I/O 事件只是事件循环中事件的一种</strong>，除此之外，还有各种其他事件，前文也说过，定时器事件也是一种事件，但它并不是异步 I/O。


事件循环就是个死循环，那么把它的逻辑按时序拉平，就是一条直线，或者公交路线。
<strong>在死循环中，大部分时间都阻塞在等待事件，这个时候并不耗 CPU</strong>，而是等待底层 epoll 得到事件。
这个等待可以类比成公交车在路线上一直开，等到站。而一旦有事件完成了（比如文件 I/O），epoll 就会得到通知，从而进入死循环代码块中的下一步，即拿着通知的相应内容去做用户业务逻辑。
比如文件读取完成了，那么 libuv 的事件循环会把对应信息给到等待这个事件的回调函数，通常这个回调函数最终会一路调用至 JavaScript，从而唤起 JavaScript 侧的文件读取的回调函数。
这就是用户这段代码的底层表现：
```
fs.readFile(filename, (err, content) => {
  // 这里就是 callback
});
```

<img src="./pics/eventloop示意图.awebp">

如图所示，事件循环那条线可以理解为之前提到的死循环，或者公交路线。
我们可以看到，除了始发站之外，剩下的站点都必须由某个事件触发，比如 kernel 传过来的 epoll 事件，或者 libuv 自己内部的定时器事件。
也只有在各站点中，事件循环才能去做其他逻辑，比如执行一段代码，或者这段代码里面有去做其他的 I/O 操作、定时器操作等。
剩下时间都阻塞在 epoll 等待上面。我们称这一个站点（节点）为一个 tick。

上面的图转化为用户的 Node.js 代码，大概长这样：
```
fs.readFile(filename, (err, content) => {
  fs.writeFile(filename, content, err => {
    // 假设这个 `writeFile` 写文件要持续 2 秒钟
  });

  setTimeout(() => {
    console.log('timer done!');
  }, 1000);
});
```

<br>

## uv_async_t
如果要在一个新线程做一件事情，又想在新线程做完事情之后，能回归到主事件循环做之后的事，这时就需要用到 uv_async_t 了。
它的作用就是允许你在一条<strong>非 libuv 事件循环的线程</strong>中通知 libuv 说我某个事情做完了，
这样它的公交车站下一站就能以“这条线程做完了”为事件来处理逻辑了。

Node.js 中 vm 模块执行的超时就借助了 uv_async_t 的能力。
因为 vm 在执行用户代码的时候，是在主事件循环上执行的，这个时候，只有一个上帝视角的线程才能在超时的时候终止它的执行。
这个上帝视角在 Node.js 中被称作 Watchdog，看门狗。

看门狗在其析构函数中，就是通过 uv_async_t 来终止看门狗自身的事件循环。就像这样：

<img src="./pics/watchdog.awebp">

<br>

## 主要代码
NodeJS事件循环的主要代码，是C++实现的
```
do {
  if (env->is_stopping()) break;
  uv_run(env->event_loop(), UV_RUN_DEFAULT);
  if (env->is_stopping()) break;

  platform->DrainTasks(isolate);

  more = uv_loop_alive(env->event_loop());
  if (more && !env->is_stopping()) continue;

  if (EmitProcessBeforeExit(env).IsNothing())
    break;

  {
    HandleScope handle_scope(isolate);
    if (env->RunSnapshotSerializeCallback().IsEmpty()) {
      break;
    }
  }

  // Emit `beforeExit` if the loop became alive either after emitting
  // event, or after running some callbacks.
  more = uv_loop_alive(env->event_loop());
} while (more == true && !env->is_stopping());
```
uv_run(env->event_loop(), UV_RUN_DEFAULT) 就是跑一轮事件循环。

UV_RUN_DEFAULT 代表执行事件循环直到不再有活动的和被引用的句柄（handle）或请求（request）。

说得不严谨白话一点，就是直到事件循环监听的池子里面里面已经没有关心的事件在等待了。 
这里面的实际代码就是对标上面最开始那个死循环伪代码，其实本质上是一样的。

所以实际上上面这段代码有两层循环，第一层 uv_run() 里面实际的事件循环，我在这里姑且称之为小乘轮回[^2] ；
然后在上面这段代码中肉眼可见的 do-while，实际上就是包在小乘轮回外面的另一层循环，我姑且称之为大乘轮回。


### 大乘轮回
在大乘轮回中，首先是无处不在的对 is_stopping() 的判断，一旦其处于待停止状态，就立马结束事件循环。
因为无处不在，所以我们在分析的时候可以直接忽略跟 stopping 相关的代码。

等一次 uv_run() 之后，去跑 V8 Platform 中的一些任务，

跑完之后，谁知道有没有新的事件放进去，所以得判断一下 uv_loop_alive() 现在是否还是为 0，若不为 0，则直接 continue进入下一大波的事件循环；
如果真的为 0 了，那就是一些扫尾工作，比如看看有没有 process.on('beforeExit') 事件，若没有就可以直接退出事件循环了，
若有，那就说明在这中间还有可能被丢入新的事件（比如 setTimeout() 等），那么在做一些事情（如执行 v8.startupSnapshot 的序列化回调）之后，再判断一下 uv_loop_alive() 里面是否有货，
如果有，那么事件循环还得继续。进入下一轮循环。

大乘轮回的存在是为了保证小乘轮回结束后，程序是真的要结束了，还是有可能会再丢事件进去，重新来一轮小乘轮回。

### 小乘轮回
如你所见，小乘轮回就是 uv_run() 里面的内容了，这是 libuv 里的代码。
