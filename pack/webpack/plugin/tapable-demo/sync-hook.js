const { SyncHook } = require('tapable');

// 创建一个 SyncHook 实例
const myHook = new SyncHook(['arg1', 'arg2']);

// 注册监听器
myHook.tap('listener1', (arg1, arg2) => {
  console.log(`Listener 1: ${arg1}, ${arg2}`);
});

myHook.tap('listener2', (arg1, arg2) => {
  console.log(`Listener 2: ${arg1}, ${arg2}`);
});

// 触发钩子
myHook.call('hello', 'world');