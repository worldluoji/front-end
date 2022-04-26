
let a = ''
function buildFunc (name) {
    a = name
    return function () {
        console.log(`hello ${a}`)
    }
}

let f1 = buildFunc('js')
let f2 = buildFunc('node')
let f3 = buildFunc('golang')

f3()
f1()
f2()
