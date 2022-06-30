// 函数定义
function add1(x: number, y: number) {
    return x + y
}

// 函数声明
let add2: (x: number, y: number) => number
// 实现
add2 = (x, y) => x + y

// add3 就是一个类型
type add3 = (x: number, y: number) => number
let add3Impl: add3 = (x, y) => x + y

interface add4 {
    (x: number, y: number): number
}

// add1(1, 2, 3) error

// y为可选参数
function add5(x: number, y?: number) {
    return y ? x + y : x
}
add5(1)

function add6(x: number, y = 0, z: number, q = 1) {
    console.log(x, y, z, q)
    return x + y + z + q
}
// undefined会被默认值0取代
add6(1, undefined, 3)


function add7(x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur);
}
add7(1, 2, 3, 4, 5)

// 函数重载
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]) {
    let first = rest[0];
    if (typeof first === 'number') {
        return rest.reduce((pre, cur) => pre + cur);
    }
    if (typeof first === 'string') {
        return rest.join('');
    }
}
// console.log(add8(1, 2))
// console.log(add8('a', 'b', 'c'))
