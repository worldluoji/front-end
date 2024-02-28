# tips
## tip1：
this有四种绑定方式：
- 默认绑定：默认绑定在「严格模式」下this是undefined，在非「严格模式」下是全局变量，此处没法自定义绑定；
- 隐式绑定：通过obj.或obj[...]的方式绑定；
- 显示绑定：使用Function.prototype.bind、Function.prototype.call和Function.prototype.apply的绑定方式；
- new绑定：new操作时，所触发的this绑定（可以利用这个，但本质上还是利用「隐式绑定）。

## tip 2：
如果直接在obj上添加一个「可被外界知道的属性」这样好吗？万一obj上本来就存在这个属性呢？
关于Object的key的类型，有两种方式：
- 一种是字符串
- 另一种就是Symbol

使用Symbol的好处就是: 不可被枚举到，只有你知道，不会覆盖别人，别人也没法知道，只要你不把这个 symbol 暴露给别人，别人就不能通过正常手段获取到。
```
从技术上说，symbol 不是 100% 隐藏的。
有一个内建方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 symbol。
还有一个名为 Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 symbol。
但大多数库、内建方法和语法结构都没有使用这些方法。
```

## top 3:
The apply() method calls the specified function with a given this value, and arguments provided as an array.

call() 方法的语法和作用与 apply() 方法类似，第一个参数都是用来改变上下文，
只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组