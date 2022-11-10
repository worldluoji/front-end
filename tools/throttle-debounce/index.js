import { throttle, debounce } from 'throttle-debounce';

console.log('start')

function foo() { 
    console.log('foo..'); 
}

function bar() { 
    console.log('bar..'); 
}

const fooWrapper = throttle(200, foo);

for (let i = 1; i < 10; i++) {
  setTimeout(fooWrapper, i * 30);
}

// => foo 执行了三次
// => foo..
// => foo..
// => foo..

const barWrapper = debounce(200, bar);

for (let i = 1; i < 10; i++) {
  setTimeout(barWrapper, i * 30);
}

// => bar 执行了一次 
// => bar..

console.log('end')