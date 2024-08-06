const { AsyncSeriesHook } = require('tapable');

// 创建一个 AsyncSeriesHook 实例
const asyncHook = new AsyncSeriesHook(['arg1', 'arg2']);

// 注册监听器
asyncHook.tapAsync('listener1', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 1: ${arg1}, ${arg2}`);
    callback();
  }, 1000);
});

asyncHook.tapAsync('listener2', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 2: ${arg1}, ${arg2}`);
    callback();
  }, 998);
});

// 触发钩子
asyncHook.callAsync('hello', 'world', (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('All listeners have completed.');
  }
});