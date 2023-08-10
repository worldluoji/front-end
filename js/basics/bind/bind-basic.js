const obj = {
    age: 18
}

function foo() {
    console.log(this.age);
}

const newFoo = foo.bind(obj)

newFoo(); // output 18