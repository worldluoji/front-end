/** leetcode 2804
 * @param {Function} callback
 * @param {Context} context
 */
 Array.prototype.custForEach = function(callback, context) {
    for (let i = 0; i < this.length; i++) {
        // then 'this' in callback function become context 
        callback.call(context, this[i], i, this);
    }
}


const arr = [1,2,3];
const callback = (val, i, arr) => arr[i] = val * 2;
const context = {"context":true};

arr.custForEach(callback, context)  

console.log(arr) // [2,4,6]