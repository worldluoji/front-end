
const regxString = '^\d{4}-\d{4}-\d{4}$'
let regx
try {
    regx = new RegExp(regxString)
    console.log(regx, typeof regx)
} catch (e) {
    console.log('invalid string for regx', regxString)
}