// require有缓存机制，两次导入同一个.js文件，第二次直接使用上一次的缓存
// 特殊情况下第二次如果需要重新导入，需要先 delete require.cache[require.resolve(path)]
const b = require('./b.js')
const c = require('./c.js')
const c2 = require('./c.js')

b.printInfo()
c()
c({})
c({name: 'luoji'})
console.log(c === c2)