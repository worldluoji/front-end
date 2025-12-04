import EventEmitter from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// register
myEmitter.on('event', (a, b) => {
  console.log(a, b, this, this === myEmitter);
});

let m = 1;
myEmitter.on('event2', function(a, b) {
    console.log(a, b, this, this === myEmitter, m++);
});

// trigger
myEmitter.emit('event', 'Hello', 'event');

/**
 *普通函数有自身的 this，其值取决于函数调用方式。
 *当你通过 myEmitter.emit('event2') 触发事件时，EventEmitter 内部会以类似 handler.call(myEmitter, ...args) 的方式调用监听函数。
 *因此，this 被动态绑定为 myEmitter 实例。 
 **/ 
myEmitter.emit('event2', 'Hello', 'event');
myEmitter.emit('event2', 'Hello', 'world');