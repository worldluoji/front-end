/** leetcode 2632
 * @param {Function} fn
 * @return {Function}
 */
 var curry = function(fn) {
    const n = fn.length; // get the num of fn's input params
    let current = []; // cahce current parms
    return function curried(...args) {
        const argsLen = args.length;
        if (argsLen + current.length < n) {
            current.push(...args);
            return curried;
        } else {
            const res = fn(...current, ...args);
            current = [];
            return res;
        }
    };
};


function sum(a, b) { return a + b; }
const csum = curry(sum);

console.log(csum(1)(2));
console.log(csum(1,2));