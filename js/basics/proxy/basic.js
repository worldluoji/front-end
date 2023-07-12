function sum(a, b) {
    return a + b;
}
  
const handler = {
    // 第一个参数是该对象本身，第二个参数是该对象访问的属性
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    },
    apply: function(target, thisArg, argumentsList) {
        console.log(`Calculate ${target.name}: ${argumentsList}`);    
        return target(argumentsList[0], argumentsList[1]) * 10;
    }
};

const p = new Proxy(sum, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);
console.log('c' in p, p.c);

console.log(p(1, 2));

/** leetcode 2690
 * @return {Object}
 */
 const createInfiniteObject = function() {
    const handler = {
        get: function(obj, prop) {
            return function() {
                return prop;
            }
        }
    }
    return new Proxy({}, handler);
};


 const obj = createInfiniteObject();
 console.log(obj['abc123']());
 console.log(obj['hello InfiniteObject']());
 