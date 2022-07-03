// 会为你自动推断类型
let aa = 1;
let bb = [1, null, 'a']
let cc = {x: 1, y: 'a'}

let dd = (x = 1) => x + 1

// 这里自动推断出事件为键盘事件，(parameter) event: KeyboardEvent
window.onkeydown = (event) => {
    // console.log(event.button) 还能自动推断出键盘事件有哪些属性
}

interface Foo {
    bar: number
}

// let foo = {} as Foo  使用类型断言，不建议使用，这样编译器不会提示你没有赋值的变量bar
// let foo = <Foo>{}
let foo: Foo = {
    bar: 1
}
// foo.bar = 1