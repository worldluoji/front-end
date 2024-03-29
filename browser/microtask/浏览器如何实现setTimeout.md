# 浏览器如何实现setTimeout

## 消息队列
渲染进程中所有运行在主线程上的任务都需要先添加到消息队列，然后事件循环系统再按照顺序执行消息队列中的任务。比如一些经典事件：
- 当接收到 HTML 文档数据，渲染引擎就会将“解析 DOM”事件添加到消息队列中，
- 当用户改变了 Web 页面的窗口大小，渲染引擎就会将“重新布局”的事件添加到消息队列中。
- 当触发了 JavaScript 引擎垃圾回收机制，渲染引擎会将“垃圾回收”任务添加到消息队列中。
- 同样，如果要执行一段异步 JavaScript 代码，也是需要将执行任务添加到消息队列中。
所以说要执行一段异步任务，需要先将任务添加到消息队列中。

## 延迟任务
- 在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列，这个队列中维护了需要延迟执行的任务列表，包括了定时器和 Chromium 内部一些需要延迟执行的任务。
- ProcessDelayTask 函数会根据发起时间和延迟时间计算出到期的任务，然后依次执行这些到期的任务。等到期的任务执行完成之后，再继续下一个循环过程。通过这样的方式，一个完整的定时器就实现了
- 浏览器内部实现取消定时器的操作也是非常简单的，就是直接从 delayed_incoming_queue 延迟队列中，通过 ID 查找到对应的任务，然后再将其从队列中删除掉就可以了。
- demo timout.html中，想通过 setTimeout 来设置两个回调任务，并让它们按照前后顺序来执行，中间也不要再插入其他的任务。但实际情况是我们不能控制的，比如在你调用 setTimeout 来设置回调任务的间隙，消息队列中就有可能被插入很多系统级的任务。你可以打开 Performance 工具，来记录下这段任务的执行过程。

## 注意事项
### 1. 如果当前任务执行时间过久，会影响定时器任务的执行。
例如下面的例子，虽然是延迟0秒执行，但实际上会等for循环5000次执行完才会触发setTimeout的操作。
```
function bar() {
    console.log('bar')
}
function foo() {
    setTimeout(bar, 0);
    for (let i = 0; i < 5000; i++) {
        let i = 5+8+8+8
        console.log(i)
    }
}
foo()
```
### 2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒。
也就是说在定时器函数里面嵌套调用定时器，也会延长定时器的执行时间。
```
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);
```
4ms，是因为在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。

### 3. 未激活的页面，setTimeout 执行最小间隔是 1000 毫秒
也就是说，如果标签不是当前的激活标签，那么定时器最小的时间间隔是 1000 毫秒，目的是为了优化后台页面的加载损耗以及降低耗电量。
比如打开一个页面后，不等加载完成，马上点击另一个标签页，那么之前的页面里的定时器不一定会按预想的执行。比如你设置了500毫秒，也会按1秒来执行。因为没有焦点的标签，也没有用户交互，可以牺牲实际的体验

### 4. 延时执行时间有最大值
那就是 Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0 了，这导致定时器会被立即执行。

### 5. 使用 setTimeout 设置的回调函数中的 this 不符合直觉
如果被 setTimeout 推迟执行的回调函数是某个对象的方法，那么该方法中的 this 关键字将指向全局环境，而不是定义时所在的那个对象。
```
var name= 1;
var MyObj = {
  name: 2,
  showName: function(){
    console.log(this.name);
  }
}
setTimeout(MyObj.showName,1000)
```
这里输出的是 1，因为这段代码在编译的时候，执行上下文中的 this 会被设置为全局 window，如果是严格模式，会被设置为 undefined。
解决方法：
```
//箭头函数
setTimeout(() => {
    MyObj.showName()
}, 1000);
//或者function函数
setTimeout(function() {
  MyObj.showName();
}, 1000)
```