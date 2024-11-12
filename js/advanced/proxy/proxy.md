# Proxy
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

## 语法
```
const p = new Proxy(target, handler)
```
参数说明：
- target: 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

## Reflect
Reflect也是ES6新增的一个API，它是一个对象，字面的意思是反射。
那么这个Reflect有什么用呢？

它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法。
- 比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()。
- 比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty()。

如果我们有Object可以做这些操作，那么为什么还需要有Reflect这样的新增对象呢？
- 这是因为在早期的ECMA规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些API放到了Object上面。
但是Object作为一个构造函数，这些操作实际上放到它身上并不合适。
- 另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的。
- 所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上。


## 参考
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect