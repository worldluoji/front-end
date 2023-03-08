// one important part is process.nextTick(). Every time the event loop takes a full trip, we call it a tick.
console.log("Hello => number 1");

// Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.
setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

// 非标准，setImmediate方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。
setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

process.nextTick(() => {
  console.log("Running at next tick => number 2");
});

