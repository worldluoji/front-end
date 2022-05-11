
// 返回值可变
function getParam(arg: number):{a:number,b?:number} {
    if (arg === 1) {
        return {a:1,b:2}
    }
    
    return {a:1}
}

console.log(getParam(1))
console.log(getParam(0))

// TypeScript team doesn't use null : TypeScript coding guidelines and it hasn't caused any problems. 
// Douglas Crockford thinks null is a bad idea and we should all just use undefined.