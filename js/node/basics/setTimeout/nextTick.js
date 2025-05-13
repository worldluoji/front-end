// one important part is process.nextTick(). Every time the event loop takes a full trip, we call it a tick.
console.log("Hello => number 1");

/*
setTimeout(fn, 0) 和 setImmediate（进入事件循环队列）​​
​**setTimeout(fn, 0)​：延迟设为 0 的定时器会被 Node.js 强制设置为 1ms，回调进入 ​Timers 阶段**。
​**setImmediate​：回调进入 ​Check 阶段**，在事件循环的一次完整迭代（tick）结束后执行。
*/
setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

// 非标准，setImmediate方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。
setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

setTimeout(() => {
    console.log("The timeout running last => number 4.2");
}, 10);
setTimeout(() => {
    console.log("The timeout running last => number 4.3");
}, 0);

// nextTick 回调会在当前事件循环阶段（当前操作）结束后 ​立即执行，优先级高于其他异步操作。
process.nextTick(() => {
  console.log("Running at next tick => number 2");
});

