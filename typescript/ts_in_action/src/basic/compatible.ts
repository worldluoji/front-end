/*
 * X（目标类型） = Y（源类型），X 兼容 Y
 * Y可以给X直接赋值，则以为着X兼容Y
 * 结构之间比较，参数少的兼容参数多的；函数之间比较，参数多的兼容参数少的
 */

let s: string = 'a'
// str = null

// 接口兼容性
interface X {
    a: any;
    b: any;
}
interface Y {
    a: any;
    b: any;
    c: any;
}
let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
// y包含了x的属性，y就是x,x就能兼容y;反之则不然
x = y
// y = x

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
    return handler
}

// 1)参数个数
// 参数个数比Handler实际少，可以兼容
let handler1 = (a: number) => {}
hof(handler1)
// 参数个数比Handler实际多，无法兼容
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2)

// 可选参数和剩余参数
let ac = (p1: number, p2: number) => {}
let bc = (p1?: number, p2?: number) => {}
let cco = (...args: number[]) => {}
// 正常参数，可兼容可选参数
ac = bc
// 正常参数，可兼容同类型的不定项参数
ac = cco 
// 可选参数默认不兼容正常参数和不定项参数，关闭strictFunctionTypes选项则可以兼容
// bc = ac
// bc = cco
// 不定项参数可兼容正常参数和可选参数
cco = ac
cco = bc

// 2)参数类型
let handler3 = (a: string) => {}
// hof(handler3)

interface Point3D {
    x: number;
    y: number;
    z: number;
}
interface Point2D {
    x: number;
    y: number;
}
// 这里将接口作为入参构造一个函数，参数多的兼容参数少的， 注意与上面接口的兼容性做区分
let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d
// p2d = p23 关闭strictFunctionTypes选项则可以兼容

// 3) 返回值类型 相同或为子类型，才可以兼容
let f = () => ({name: 'Alice'})
let g = () => ({name: 'Alice', location: 'Beijing'})
f = g
// g = f

// 函数重载
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}
// function overload(a: any): any {}
// function overload(a: any, b: any, c: any): any {}
// function overload(a: any, b: any) {}

// 枚举兼容性 枚举和number可以相互兼容，但枚举之间相互不兼容
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple
let no: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple

// 类兼容性 静态成员是不做比较的，实例成员兼容即可兼容
// 两个类都有同一个private属性，也不兼容，这时候只有父子类能兼容
class A {
    constructor(p: number, q: number) {}
    id: number = 1
    private name: string = ''
}
class B {
    static s = 1
    constructor(p: number) {}
    id: number = 2
    private name: string = ''
}
class CC extends A {}
let aac = new A(1, 2)
let bbc = new B(1)
// aa = bb
// bb = aa
let ccc = new CC(1, 2)
aac = ccc
ccc = aac

// 泛型兼容性
// interface Empty<T> {
//     value: T
// }
// let obj1: Empty<number> = {};
// let obj2: Empty<string> = {};
// obj1 = obj2

let logc1 = <T>(x: T): T => {
    console.log('x')
    return x
}
let logc2 = <U>(y: U): U => {
    console.log('y')
    return y
}
logc1 = logc2
