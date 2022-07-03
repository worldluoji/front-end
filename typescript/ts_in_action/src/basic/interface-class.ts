interface Human {
    name: string;
    eat(): void;
}

// Asian实现了Human借口，那必须包含Human接口中定义的所有属性和方法
class Asian implements Human {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() {}
    age: number = 0
    sleep() {}
}

// interface 继承 interface
interface Man extends Human {
    run(): void
}

interface Child {
    cry(): void
}

// 继承多个interface 
interface Boy extends Man, Child {}

let boy: Boy = {
    name: '',
    run() {},
    eat() {},
    cry() {}
}


// 接口可以继承类，接口继承类其实就是把类中的属性和方法抽象出来了
class Auto {
    state = 1
    // private state2 = 1
    // protected state3 = 3

}
interface AutoInterface extends Auto {

}

class C implements AutoInterface {
    state = 1
    // state3 = 3 // Class 'C' incorrectly implements interface 'AutoInterface'.Property 'state3' is protected but type 'C' is not a class derived from 'Auto'
}
class Bus extends Auto implements AutoInterface {

}