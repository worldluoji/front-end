const path = require('path')
let path1 = path.resolve()
console.log(path1)

let path2 = path.resolve('a')
console.log(path2)

let path3 = path.resolve('./a')
console.log(path3)

let path4 = path.resolve('/a')
console.log(path4)

let path5 = __dirname
console.log(path5)

let path6 = path.join(__dirname, 'a')
console.log(path6)