if (typeof foo === "function") {
    foo()
}

if (typeof bar === "function") {
    bar()
}

function foo(){
    console.log('foo')
}

const bar = function() {
    console.log('bar')
}