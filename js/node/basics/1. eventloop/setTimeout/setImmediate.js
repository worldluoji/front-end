const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');
const start = () => {
  console.log('start');
  // run in the next iteration of the event loop
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });

  //  Node.js 事件循环中 process.nextTick 队列的优先级高于 Promise 微任务队列。
  process.nextTick(foo);
};
start();