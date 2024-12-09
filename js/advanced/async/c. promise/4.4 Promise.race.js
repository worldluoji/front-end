/** leetcode 2637
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
 var timeLimit = function(fn, t) {
    let timeOutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`Time Limit Exceeded at t=${t}ms`);
        }, t);
    });
	return async function(...args) {
        // the faster promise will return
        return Promise.race([fn(...args), timeOutPromise]);
    }
};


const limited = timeLimit((t) => new Promise((resolve) => setTimeout(() => resolve(123), t)), 100);
limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 
limited(90).then(console.log).catch(console.log); 