// leetcode 2622
const TimeLimitedCache = function() {
    this.m = new Map();
    this.holder = {};
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const existed = this.m.has(key);
    this.m.set(key, value);
    if (this.holder[key]) {
      clearTimeout(this.holder[key]); 
    }
    this.holder[key] = setTimeout(()=> {
        this.m.delete(key);
    }, duration);
    return existed;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    return this.m.has(key) ? this.m.get(key) : -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.m.size;
};


let obj = new TimeLimitedCache();
console.log(obj.set(1, 42, 1000)); // false
console.log(obj.set(1, 43, 1000));
console.log(obj.get(1)); // 43
console.log(obj.count()); // 1

setTimeout(() => {
    console.log(obj.count());
}, 1001);
