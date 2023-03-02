abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep(): void
}
// let animal = new Animal() 和Java一样，抽象类不能被实例化，但是ts的抽象类中可以有方法实现。

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
        this.pri()
    }
    public name: string = 'dog'
    run() {}
    private pri() {}
    protected pro() {}
    readonly legs: number = 4
    static food: string = 'bones'
    sleep() {
        console.log('Dog sleep')
    }
}
// console.log(Dog.prototype)
// 示例dog上才会有相应的成员变量，比如name, 类成员变量必须赋初值
let dog = new Dog('wangwang')
// console.log(dog)
// dog.pri()  私有方法不能被实例调用
// dog.pro()  protected也不可以被实例调用，但是可以被子类实例调用
// console.log(Dog.food) 静态成员
dog.eat()

class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name)
        this.color = color
        // this.pri()
        this.pro()
    }
    // color: string
}
// console.log(Husky.food)

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
    i.sleep()
})

// 通过返回this实现链式调用
class Workflow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}
new Workflow().step1().step2()

class MyFlow extends Workflow {
    next() {
        return this
    }
}
new MyFlow().next().step1().next().step2()


// Student有firstName和lastName，他就是一个Person, 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句
class Student {
    fullName: string;
    // 注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(greeter(user));