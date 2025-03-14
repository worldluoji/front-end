const EventEmitter = require('node:events');

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

myEmitter.emit('event2', 'Hello', 'event');
myEmitter.emit('event2', 'Hello', 'world');