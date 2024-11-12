/** leetcode 2636
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */
 const promisePool = async function(functions, n) {
    // 每个promise的作用都是一致的:每个promise都可以作为一个“线程”，不停的从functions中取出还未完成的任务进行执行，执行结束了继续执行下一个
    // Array.from({ length: n }) is the same as new Array(m)
    return Promise.all(Array.from({ length: n }).map(async function () {
        while(functions.length) {
            // shift remove and return the fisrt element
            await functions.shift()();
        }
    }));
};


const sleep = (t) => new Promise(res => setTimeout(() => res(t), t));

const start = Date.now();
promisePool([() => sleep(500), () => sleep(400), () => sleep(300)], 2)
    .then( () => console.log(Date.now() - start)) // After 700ms   1. fisrt 500 and 400, then 400 finished, 300 in.
