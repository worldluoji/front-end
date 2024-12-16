// SyncBailHook 的特点是它会停止执行后续的监听器，一旦有一个监听器返回了一个非空值。
const { SyncBailHook } = require('tapable');

const syncBailHook = new SyncBailHook(['arg1', 'arg2']);

syncBailHook.tap('listener1', (arg1, arg2) => {
  console.log(`Listener 1: ${arg1}, ${arg2}`);
  return arg1 === 'stop'; // 如果 arg1 是 'stop'，则返回 true，否则返回 undefined
});

syncBailHook.tap('listener2', (arg1, arg2) => {
  console.log(`Listener 2: ${arg1}, ${arg2}`);
  return arg2 === 'stop'; // 如果 arg2 是 'stop'，则返回 true，否则返回 undefined
});

syncBailHook.call('stop', 'continue'); // Listener 1 会被执行，但 Listener 2 不会被执行