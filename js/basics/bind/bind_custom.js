// leetcode 2754

Function.prototype.bindPolyfill = function(obj) {
    const symbol = Symbol('__fn__')
    obj[symbol] = this
    return (...args) => obj[symbol](...args)
}

function f() {
    console.log('My context is ' + this.ctx);
}

const boundFunc = f.bindPolyfill({ "ctx": "My Object" })
boundFunc();