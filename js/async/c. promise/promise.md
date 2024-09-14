# Promise functions

The next static methods takes an iterable of promises as input and returns a single Promise. 

# 1. Promise.all
This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), 
with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

<br>

# 2. Promise.allSettled
This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), 
with an array of objects that describe the outcome of each promise.

<br>

# 3. Promise.any
This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. 
It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
第一个fullfiled的.

<br>

# 4. Promise.race
This returned promise settles with the eventual state of the first promise that settles.
Promise.race()方法主要关注 Promise 是否已完成，而不管其fullfiled还是rejected。

<br>

## promise的三种状态
在 JavaScript 中，Promise 对象有以下三种状态：

1. **Pending（等待中）**：初始状态，既不是 fulfilled（已成功）也不是 rejected（已失败）。在这个状态下，Promise 的结果还未确定。
   - 例如，当创建一个新的 Promise 并且异步操作还在进行中时，Promise 就处于 Pending 状态。
   ```javascript
   const promise = new Promise((resolve, reject) => {
       // 异步操作正在进行中
       setTimeout(() => {
           // 根据条件决定是 resolve 还是 reject
       }, 1000);
   });
   console.log(promise); // Promise { <pending> }
   ```

2. **Fulfilled（已成功）**：意味着异步操作成功完成。
   - 当 Promise 的异步操作成功时，会调用 `resolve` 函数，将 Promise 的状态从 Pending 转变为 Fulfilled，并传递一个值作为结果。
   ```javascript
   const fulfilledPromise = new Promise((resolve, reject) => {
       resolve('Success!');
   });
   console.log(fulfilledPromise); // Promise { 'Success!' }
   ```

3. **Rejected（已失败）**：表示异步操作失败。
   - 当 Promise 的异步操作出现错误时，会调用 `reject` 函数，将 Promise 的状态从 Pending 转变为 Rejected，并传递一个错误对象或错误信息作为原因。
   ```javascript
   const rejectedPromise = new Promise((resolve, reject) => {
       reject('Error!');
   });
   console.log(rejectedPromise); // Promise { <rejected> 'Error!' }
   ```

一旦 Promise 的状态从 Pending 转变为 Fulfilled 或 Rejected，它就不能再改变状态。这确保了 Promise 的结果是不可变的，并且可以安全地在多个地方使用而不用担心结果会意外改变。