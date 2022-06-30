
let id = 5; // TS knows it's a number
let firstname = 'danny'; // TS knows it's a string
let hasDog = true; // TS knows it's a boolean
// hasDog = 'yes'; // ERROR

// 赋值多个类型，一般不建议这么玩
let age: string | number;
age = 26;
age = '26';

// 1. array
let arr: number[] = [1,2,3]
let arr2: Array<number> = [4,5,6]

// 2. tuple
let tuple: [number, string] = [1,'2']
tuple.push('3')
tuple.push(1)
// tuple.push(true) 报错

// 3. function
// let add = (x, y) => x + y  报错
// ts中lambda中入参需要指明类型，返回值也是number
let add = (x: number, y: number) => x + y 

// compute是函数类型，没有具体实现
let compute: (x: number, y: number) => number
// 具体实现compute
compute = (x, y) => x + y

// 4.Object
/*
错误示例，未指明类型无法修改
let obj: object = {x:1, y:2}
obj.x = 3
*/
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3

// 5. symbol
let s1 = Symbol()
let s2: Symbol = Symbol()
// console.log(`s1 == s2 ? {}`, s1 == s2) false

// 6. undefined and null
let un: undefined = undefined
let nu: null = null

// null和undefined是其它类型的字类型，需要把tsconfig里的strictNullCheck改为false,就能把其它类型变量赋为null
s1 = null

// 7. void 
let noReturn = () => {}

// 8. any
// ts中，不指定类型，就是any, 不建议使用any
let a

// 9. never
// 跑出了异常，就没有返回值
let err = () => {
    throw new Error('error')
}

let endless = () => {
    while(true) {}
}