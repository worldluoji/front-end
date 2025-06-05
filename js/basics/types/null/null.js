// Both null and undefined are only `==` to themselves and each other:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true


// You don't have to worry about falsy values making through this check
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false


function foo(arg) {
    if (arg != null) {
      // arg must be a string as `!=` rules out both null and undefined. 
        console.log('not null')
    } else {
        console.log('null')
    }
}

foo(null)
foo(undefined)
foo(0)

console.log('***********************')
function bar(arg) {
    if (arg) {
      // arg must be a string as `!=` rules out both null and undefined. 
        console.log('not null')
    } else {
        console.log('null')
    }
}

bar(null)
bar(undefined)
bar(0)

console.log('***********************')
function tar(arg) {
    if (arg !== null) {
      // arg must be a string as `!=` rules out both null and undefined. 
        console.log('not null')
    } else {
        console.log('null')
    }
}

tar(null)
tar(undefined)
tar(0)
