const { AsyncParallelHook } = require('tapable');

const parallelHook = new AsyncParallelHook(['arg1', 'arg2']);

parallelHook.tapAsync('listener1', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 1: ${arg1}, ${arg2}`);
    callback(); // 完成监听器
  }, 1000);
});

parallelHook.tapAsync('listener2', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 2: ${arg1}, ${arg2}`);
    callback(); // 完成监听器
  }, 998);
});

parallelHook.callAsync('hello', 'world', (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('All listeners have completed.');
  }
});