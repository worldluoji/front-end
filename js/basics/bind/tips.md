# tips
## tip1：
this有四种绑定方式：
- 默认绑定：默认绑定在「严格模式」下this是undefined，在非「严格模式」下是全局变量，此处没法自定义绑定；
- 隐式绑定：通过obj.或obj[...]的方式绑定；
- 显示绑定：使用Function.prototype.bind、Function.prototype.call和Function.prototype.apply的绑定方式；
- new绑定：new操作时，所触发的this绑定（可以利用这个，但本质上还是利用「隐式绑定）。

---

## tip 2:
The apply() method calls the specified function with a given this value, and arguments provided as an array.

call() 方法的语法和作用与 apply() 方法类似，第一个参数都是用来改变上下文，
只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组