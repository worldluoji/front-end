
/**
* 我们创建了一个 SyncLoopHook 实例，并注册了两个监听器。
* 当 call 方法被调用时，它会按照注册顺序依次执行监听器。每个监听器可以返回 true 或 false，
* 其中 true 表示继续循环，undefined 表示停止循环。
*/
const { SyncLoopHook } = require('tapable');

// 创建 SyncLoopHook 实例
const loopHook = new SyncLoopHook(['counter', 'maxCount']);


var counter = 0;
// 注册监听器
loopHook.tap('incrementCounter', (maxCount) => {
  console.log(`Current counter: ${counter}`);
  counter++;
  return counter < maxCount ? true: undefined; // 返回 true 继续循环，返回 undefined 停止循环
});

// 触发 SyncLoopHook
loopHook.call(5)