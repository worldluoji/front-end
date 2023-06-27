/** leetcode 2623 
 * implement a mem by closure
 * @param {Function} fn
 */
 function memoize(fn) {
    let m = new Map();
    return function(...args) {
        const jargs = JSON.stringify(args);
        if (m.has(jargs)) {
            return m.get(jargs);
        }
        const res = fn(...args);
        m.set(jargs, res);
        return res;
    }
}



 let callCount = 0;
 const memoizedFn = memoize(function (a, b) {
 	 callCount += 1;
     return a + b;
 })
 console.log(memoizedFn(2, 3)) // 5
 console.log(memoizedFn(2, 3)) // 5
 console.log(callCount) // 1 
 