/*
从高层级看，JavaScript 中有 task 和 microtask。
task 处理 I/O 事件和定时器(setTimeout、setInterval等)，
并且每次只执行一个。

microtask 实现了延迟执行 async/await 和 promise，
在每次 task 执行结束后执行。
在每次执行权返回给事件循环（event loop）之前 microtask 
队列都会被执行到空为止。

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
*/

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

/*
Tasks are scheduled so the browser can get from its internals into JavaScript/DOM land
and ensures these actions happen sequentially. 
Between tasks, the browser may render updates. 
Getting from a mouse click to an event callback requires scheduling a task, 
as does parsing HTML, and in the above example, setTimeout.

setTimeout waits for a given delay then schedules a new task for its callback. 
This is why setTimeout is logged after script end, 
as logging script end is part of the first task, and setTimeout is logged in a separate task. 
Right, we're almost through this, but I need you to stay strong for this next bit…



Microtasks are usually scheduled for things that should happen straight after the currently executing script, 
such as reacting to a batch of actions, 
or to make something async without taking the penalty of a whole new task. 
The microtask queue is processed after callbacks as long as no other JavaScript is mid-execution, and at the end of each task. 
Any additional microtasks queued during microtasks are added to the end of the queue and also processed. 
Microtasks include mutation observer callbacks, and as in the above example, promise callbacks.

Once a promise settles, or if it has already settled, it queues a microtask for its reactionary callbacks. 
This ensures promise callbacks are async even if the promise has already settled. 
So calling .then(yey, nay) against a settled promise immediately queues a microtask. 
This is why promise1 and promise2 are logged after script end, 
as the currently running script must finish before microtasks are handled. 
promise1 and promise2 are logged before setTimeout, 
as microtasks always happen before the next task.
*/