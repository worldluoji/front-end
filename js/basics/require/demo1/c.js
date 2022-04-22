module.exports = function (c) {
    if (c && c.name) {
        console.log(`hello ${c.name}`)
    } else {
        console.log('hello commonjs')
    }
}