
interface StringArray {
    [index: number]: string
}

let sa: StringArray = '123'
let sa2: StringArray = ['123','456','789']
console.log(sa)
console.log(sa2)


interface StringString {
    [key: string]: string,
    // age: number , error 上main使用了任意属性为string,其它成员则必须为string
    [index: number]: string
}


interface User {
    readonly id: number,
    age?: number,
    name : string
}

interface Result {
    data: User[]
}

function Render(result: Result) {
    result.data.forEach(element => {
        console.log(element.id, element.name)
        if (element.age) {
            console.log(element.age)
        }
    });
}

let res: Result = {
    data: [{
        id: 1,
        age: 18,
        name: 'zhazhafei'
    }]
}
Render(res)

let res2: Result = {
    data: [{
        id: 1,
        age: 18,
        name: 'zhazhafei',
        address: 'Chendu'
    } as User]
}
Render(res2)

let res3: Result = {
    data: [<User>{
        id: 1,
        age: 18,
        name: 'zhazhafei',
        address: 'Chendu'
    }]
}
Render(res3)


interface FuntionalInterface {
    (x:number, y:number): number
}

let Add: FuntionalInterface = (x, y) => x + y
let De: FuntionalInterface = (x, y) => x - y

// 与上面等价
type Operation = (x: number, y: number) => number
let div: Operation = (x,y) => x / y


interface Lib {
    (): void,
    version: string,
    doSomeThing(): string
}

let lib: Lib = (() => {}) as Lib
lib.version = "1.0.0"
lib.doSomeThing = () => {
    return 'finish'
}