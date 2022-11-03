let data = {};
let b = (JSON.stringify(data) === "{}")
console.log(b)

let arr = Object.keys(data)
console.log(arr.length === 0) //true

arr = Object.getOwnPropertyNames(data)
console.log(arr.length === 0) //true