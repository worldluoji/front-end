
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