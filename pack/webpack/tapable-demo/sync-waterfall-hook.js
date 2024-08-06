// 上一个的返回值传递给下一个
const { SyncWaterfallHook } = require('tapable');

const syncWaterfallHook = new SyncWaterfallHook(['arg1', 'arg2']);

syncWaterfallHook.tap('listener1', (arg1, arg2) => {
  console.log(`Listener 1: ${arg1}, ${arg2}`);
  return [arg1 + ' processed by listener1', arg2]; // 返回修改后的值
});

syncWaterfallHook.tap('listener2', (arg1, arg2) => {
  console.log(`Listener 2: ${arg1}, ${arg2}`);
  return [arg1 + ' processed by listener2', arg2]; // 返回修改后的值
});

syncWaterfallHook.call('initial value', 'additional data'); // 传递初始值