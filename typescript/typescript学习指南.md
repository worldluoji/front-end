# typescript学习指南

## 1. 为什么使用typescript?
- typeScript解决了JavaScript的一大痛点，那就是动态类型。
JavaScript的动态类型简单、灵活，写起来很爽，但是不适用于大型项目，代码一多会难以维护，尤其是看别人的代码。
而TypeScript则采用了静态类型，写法上虽然麻烦点，但是换来了更稳固的结构和清晰的逻辑。
```
Types increase your agility when doing refactoring. 
It's better for the compiler to catch errors than to have things fail at runtime.

Types are one of the best forms of documentation you can have. 
The function signature is a theorem and the function body is the proof.

TypeScript provides compile time type safety for your JavaScript code. 
This is no surprise given its name. 
The great thing is that the types are completely optional. 
Your JavaScript code .js file can be renamed to a .ts file and TypeScript will 
still give you back valid .js equivalent to the original JavaScript file. 
TypeScript is intentionally and strictly a superset of JavaScript with optional Type checking.
```

- 微软发明，Google背书，有较好的前景

## 2. 安装和使用typescript
- 安装typescript
```
npm install -g typescript
```

- 编译
```
tsc hello.ts
```
编译后会生成.js文件

- 插件（可选）
```
JavaScript and TypeScript Nightly
Enables typescript@next to power VS Code's built-in JavaScript and TypeScript support
```

## 3. 类型
```
//布尔值
let isDone: boolean = false

//数字
let n: number = 6

//字符串
let pepoName: string = '小王'
let introduction: string = `${pepoName}今年已经${n}岁了！！！`

//任意类型
let anySomething: any = '什么都行'

//联合类型，两种类型都可以
let numandstring: number | string;

//数组
let list: number[] = [1,2,3]
let listString: string[] = ['1','2','3']
let numandString: (number | string)[] = ['1',2,3]
```
TypeScript还有类型推论，如果在创建一个变量的时候没有指定类型，那么会根据赋值类型来决定，
如果只是创建了一个变量但是没有赋值，会默认为any。

## 4. 接口
```
interface Person {
    //只读属性，只能在创建实例的时候赋值，之后不可以更改
    readonly id: number;
    name: string;
    age: number;
    //后面加问号的话允许创建实例时少这个属性
	address?: string;
    //如果希望在实例里自由添加属性，可以使用任意属性
    //但是要注意的是，一旦创建了任意属性，那么接口里面的确定属性和必要属性必须为任意属性类型的子集
    //比如任意属性的类型为string的话，age会报错，因为它为number
    [propName: string]: any;
}

//多一个属性或者少一个都会报错
let tom: Person = {
    id: 1,
    name: 'Tom',
    age: 18,
}
```

## 5. function
```
//空白值函数
function awsome(): void{
	console.log('do something')
}

//参数后面有？则是可以跳过
function buildName(firstName: string, lastName?: string, age: number = 18) {
	if (!lastName) {
        console.log(firstName)
        return
    }
    console.log(firstName + lastName)
}
```

## 6. 声明文件
在使用第三方库时，必须引入它的声明文件才能获得代码补全和提示，
可以使用@types来管理声明文件，比如要使用Puppeteer，要引入它的声明文件需要：
npn install @types/Puppeteer


## 7. typescript免费教程
- https://basarat.gitbook.io/typescript/
- https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html

## 8. Vue and React with typescript
- https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter
- https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter
- https://www.tslang.cn/samples/index.html

这里补充说明的时候，Vue或者React使用了TypeScript后，常常需要使用Html各元素的类型，可参考：
```
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
```