# 闭包
## 闭包的定义
在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，
当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，
但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。
比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

## 闭包例子：
查看和运行demo closure.js
```
function foo() {
    var myName = "luoji3"
    const test2 = 2
    var innerBar = {
        getName: function() {
            return myName
        },
        setName: function(newName) {
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName("luoji1")
bar.getName()
console.log(bar.getName())
```
输出结果为: luoji1

根据词法作用域的规则，内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变量，
所以当 innerBar 对象返回给全局变量 bar 时，虽然 foo 函数已经执行结束，
但是 getName 和 setName 函数依然可以使用 foo 函数中的变量 myName 和 test1

foo 函数执行完成之后，其执行上下文从栈顶弹出了，
但是由于返回的 setName 和 getName 方法中使用了 foo 函数内部的变量 myName 和 test1，
所以这两个变量依然保存在内存中。这像极了 setName 和 getName 方法背的一个专属背包，
无论在哪里调用了 setName 和 getName 方法，它们都会背着这个 foo 函数的专属背包。

之所以是专属背包，是因为除了 setName 和 getName 函数之外，其他任何地方都是无法访问该背包的，
我们就可以把这个背包称为 foo 函数的闭包。

JavaScript 引擎会沿着“当前执行上下文–>foo 函数闭包–> 全局执行上下文”的顺序来查找 myName 变量，
因为foo函数里myName这个变量，所以setName和getName操作的其实都是闭包里的myName变量。
可以通过浏览器的开发者工具查看闭包中的变量。

## 闭包是怎么回收的
- 通常，如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。
- 如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存

所以在使用闭包的时候，你要尽量注意一个原则：

- 如果该闭包会一直使用，那么它可以作为全局变量而存在；
- 如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。