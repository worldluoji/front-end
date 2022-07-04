/*
* 交叉类型和联合类型
*/

interface DogInterface {
    run(): void
}
interface CatInterface {
    jump(): void
}

// 定义pet类型为DogInterface和CatInterface的交叉类型，必须实现其所有接口
let pet: DogInterface & CatInterface = {
    run() {},
    jump() {}
}

// 联合类型
let aad: number | string = 1
// 这里意味着， b 只能是'a','b','c'中的一种
let b: 'a' | 'b' | 'c'
let c: 1 | 2 | 3

class Doga implements DogInterface {
    run() {}
    eat() {}
}
class Cata  implements CatInterface {
    jump() {}
    eat() {}
}
enum Master { Boy, Girl }
function getPet(master: Master) {
    let pet = master === Master.Boy ? new Doga() : new Cata();
    //  pet虽然是联合类型，但不加判断，则只能直接使用交集中的方法
    // pet.run()
    // pet.jump()
    pet.eat()
    return pet
}

interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle

// 使用s.kind属性，进行了类型保护
function area(s: Shape) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case 'circle':
            return Math.PI * s.radius ** 2
        default:
            return ((e: never) => {throw new Error(e)})(s)
            // 这里的意义是，如果s是never类型，那么返回，否则没有覆盖到的分支会被检测到，编译器就会报错
    }
}
console.log(area({kind: 'circle', radius: 1}))