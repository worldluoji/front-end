function logAny(value: any) {
    console.log(value);
    return value;
}
// 为什么要用范型不用any： any隐含了类型，使用范型则可以在使用时明确指定类型 


function log<T>(value: T): T {
    console.log(value);
    return value;
}
log<string[]>(['a', ',b', 'c'])
log(['a', ',b', 'c'])

type Log1 = <T>(value: T) => T
let myLog: Log1 = log

// 范型T写在接口定义后，意味着内部的方法都可以用范型T； 也可以写在方法前面，意味着只针对单个方法。
interface Log2<T> {
    (value: T): T
}
let myLog2: Log2<number> = log
myLog2(1)

class Log<T> {
    run(value: T) {
        console.log(value)
        return value
    }
}
let log1 = new Log<number>()
log1.run(1)

// 没有指明范型的具体类型，那么可以传任意的类型
let log2 = new Log()
log2.run({ a: 1 })

interface Length {
    length: number
}
// T 继承 Length接口，实现了类型约束，则value可直接使用length属性
function logAdvance<T extends Length>(value: T): T {
    console.log(value, value.length);
    return value;
}
// 数组，字符串都有length属性，则可以使用logAdvance方法
logAdvance([1])
logAdvance('123')
logAdvance({ length: 3 })