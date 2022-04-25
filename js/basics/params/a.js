console.log('start')
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`)
// })
let obj = getObj()
console.log(obj)
console.log('end')

function getObj() {
    return process.argv.slice(2)
}