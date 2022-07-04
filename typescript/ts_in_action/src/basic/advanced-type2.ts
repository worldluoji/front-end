/*
* 索引类型
*/

let obja = {
    a: 1,
    b: 2,
    c: 3
}

// function getValues(obj: any, keys: string[]) {
//     return keys.map(key => obj[key])
// }
// console.log(getValues(obja, ['a', 'b'])) 正常返回[1,2]
// console.log(getValues(obj, ['d', 'e'])) 返回两个undefined，编译器不会报错

// 通过范型约束了K一定是T的所有属性的类型的集合，这里其实就是string "a" | "b" | "c", 则入参的类型keys就被限定为了它
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
}
console.log(getValues(obja, ['a', 'b']))
// console.log(getValues(obj, ['d', 'e'])) 编译器能检查到问题

// keyof T
interface Obj {
    a: number;
    b: string;
}

// key 所代表的类型就是Obj对应员所代表的类型，这里等价于 'a' | 'b' 
let key: keyof Obj
key = 'a'
key = 'b'
// key = 'c' // error

// T[K], 索引类型，value就代表了Obj的成员a的类型，即number
let value: Obj['a']
value = 3
// value = '3' // error
// T extends U 范型约束