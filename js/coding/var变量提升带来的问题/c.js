if (typeof foo === "function") {
    foo()
}

if (typeof bar === "function") {
    bar()
}

function foo(){
    console.log('foo')
}

var bar = function() {
    console.log('bar')
}