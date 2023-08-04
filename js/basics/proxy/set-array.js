/** leetcode 2692
 * @param {Object | Array} obj
 * @return {Object | Array} immutable obj
 */
const forbiddenFuncs = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

let handler = {
    set(o, prop, value) {
        if (o instanceof Array) {
            throw `Error Modifying Index: ${prop}`;
         } else {
            throw `Error Modifying: ${prop}`;
         }
    }
}
 
var makeImmutable = function(obj) {
    if (!obj || (typeof obj !== 'object')) {
        return obj;
    }

     // Check if the obj is an Array. if it is true, forbid the methods in forbiddenFuncs
    if (Array.isArray(obj)) {
         forbiddenFuncs.forEach(method => {
             obj[method] = () => {
                 throw `Error Calling Method: ${method}`;
             }
         })
    }
    Object.keys(obj).forEach(k => {
        obj[k] = makeImmutable(obj[k]);
    })

    return new Proxy(obj, handler);
};