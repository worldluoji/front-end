
// 使用主工作区（父package.json）的依赖, 当前目录的package.json实际没有安装lodash
const loadash = require('lodash')

const obj = {o2: 'foo', o1: 'bar'}

const res = loadash.get(obj, 'o1', 'foo')
console.log(res)

// 引用foo模块
const foo = require('foo')
console.log(foo)