
console.log('start')
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`)
// })
let args = require('minimist')(process.argv.slice(2))

console.log(args)
console.log(args['name'])
console.log('end')

// https://github.com/substack/minimist
// node b.js --name=jole

// 如果使用npm, npm scripts参数传递的命令行分割符是'--'。
// npm run build -- --name hello，即可将后续参数添加到process.argv数组中。