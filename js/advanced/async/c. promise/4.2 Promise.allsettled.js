const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result))).finally(() => {
    console.log('*'.repeat(36));
  });



/** leetcode 2795 实现Promise.allSettled功能
 * @param {Array<Function>} functions
 * @return {Promise}
 */
const promiseAllSettled = function(functions) {
  return new Promise((resolve) => {
    const n = functions.length;
    let res = new Array(n).fill(null);
    let count = 0;
    for (let i = 0; i < n; i++) {
      functions[i]().then(value => {
        count++;
        // 原来在哪个位置还是哪个位置
        res[i] = { status: "fulfilled", value };
        // count === n 意味着函数都已经执行完毕
        if (count === n) {
          // 在内部promise，可以调用外部promise的resolve，以返回异步结果
          resolve(res);
        }
      }).catch(e => {
        count++;
        res[i] = { status: "rejected", reason: e };
        if (count === n) {
          resolve(res);
        }
      })
    }
  });
};

const functions = [
  () => new Promise(resolve => setTimeout(() => resolve(20), 100)), 
  () => new Promise(resolve => setTimeout(() => resolve(15), 100))
];

const pm = promiseAllSettled(functions);
pm.then(console.log);