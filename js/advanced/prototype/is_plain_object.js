/**
 * 检查给定的对象是否是一个“纯对象”，即通过 {} 或 new Object() 创建的对象，而不是其他类型的对象（如数组、日期等）。
*/

function isPlainObject (obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    // 一直沿着原型链往上找到不为null的节点
    while (Object.getPrototypeOf (proto) !== null) {
      proto = Object.getPrototypeOf (proto)
    }
  
    return Object.getPrototypeOf (obj) === proto
}

// Object.create(null) 创建一个空对象，没有proptotype对象，Object.create({})则有proptotype对象
console.log(isPlainObject(Object.create({})))
console.log(isPlainObject(Object.create(null)))

console.log(isPlainObject({name: 'zhangsan'}))
console.log(isPlainObject({}))

console.log(isPlainObject([1,3]))
console.log(isPlainObject(new Date()))