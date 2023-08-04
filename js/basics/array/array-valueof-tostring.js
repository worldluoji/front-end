/** leetcode 2695
 * @param {number[]} nums
 */
var ArrayWrapper = function(nums) {
    this.nums = nums;
};

ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce((a,b) => a + b, 0);
}

ArrayWrapper.prototype.toString = function() {
    if (!this.nums.length) {
        return '[]';
    }
    return '[' + this.nums.reduce((s1,s2) => s1 + ',' + s2) + ']';
}


const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
console.log(obj1 + obj2); // 10
console.log(String(obj1)); // "[1,2]"
console.log(String(obj2)); // "[3,4]"
