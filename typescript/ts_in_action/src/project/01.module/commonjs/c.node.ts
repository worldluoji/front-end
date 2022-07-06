// 没有使用es6 import规范，会报错：
// Do not use a triple slash reference for a.ts, use `import` style instead  @typescript-eslint/triple-slash-reference 
// 因为这是教学代码，可将 @typescript-eslint/triple-slash-reference 屏蔽
let c1 = require('./a.node')
let c2 = require('./b.node')
let c3 = require('../es6/a')
import c4 = require('../es6/d')

console.log(c1)
console.log(c2)
// c3() 不能直接调用，commonjs规范，调用了es6 export的module,需要取default() 
// console.log(c3)
// c3.default()
c4()

// 建议两种模块规范不要混用