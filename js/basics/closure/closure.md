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

从内存的角度看：
- 当 JavaScript 引擎执行到 foo 函数时，首先会编译，并创建一个空执行上下文。
- 在编译过程中，遇到内部函数 setName，JavaScript 引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了 foo 函数中的 myName 变量，由于是内部函数引用了外部函数的变量，所以 JavaScript 引擎判断这是一个闭包，于是在堆空间创建换一个“closure(foo)”的对象（这是一个内部对象，JavaScript 是无法访问的），用来保存 myName 变量。
- 由于 test2 并没有被内部函数引用，所以 test2 依然保存在调用栈中。

## 闭包是怎么回收的
- 通常，如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。
- 如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存

所以在使用闭包的时候，你要尽量注意一个原则：

- 如果该闭包会一直使用，那么它可以作为全局变量而存在；
- 如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。


---

## 闭包的应用
当然！JavaScript 中的闭包是一个非常强大且核心的概念，它的实际应用价值无处不在。简单来说，**闭包就是能够访问其他函数内部变量的函数**，或者更通俗地讲，是**函数和其周围状态（词法环境）的引用捆绑在一起**的组合。

它的核心价值在于：**让你拥有一个可以长期存储且私有的“数据存储”，同时又能让这些数据与特定的功能（函数）相关联。**

以下是闭包的一些主要实际应用价值，并附有具体例子：

---

### 1. 数据私有化与封装 (Data Privacy and Encapsulation)

这是闭包最经典和重要的用途。在 ES6 引入 `class` 和私有字段（`#`）之前，闭包是模拟私有变量的唯一方法。

**场景：** 你想创建一个对象，它有一些内部状态，但你不希望这些状态被外部直接访问和修改，只能通过你提供的特定方法来操作。

**例子：创建一个计数器**
```javascript
function createCounter() {
  let count = 0; // 私有变量，外部无法直接访问

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

const myCounter = createCounter();
console.log(myCounter.getValue()); // 0
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1

// 无法直接访问和修改 count
// console.log(myCounter.count); // undefined
// myCounter.count = 10; // 不会影响真正的 count 值
console.log(myCounter.getValue()); // 1 (证明上面的直接赋值无效)
```
`count` 变量被安全地封装在 `createCounter` 函数内部，只能通过返回的 `increment`, `decrement`, 和 `getValue` 方法进行操作。这就是封装性。

---

### 2. 模块模式 (Module Pattern)

这是上一种应用的延伸，用于创建具有私有和公有方法的完整模块。在现代 JavaScript 中，ES6 模块（`import/export`）是首选，但闭包实现的模块模式在早期和某些特定场景下仍然非常有用。

**例子：一个简单的 UI 工具模块**
```javascript
var MyModule = (function() {
  // 私有变量
  var privateSettings = {
    theme: 'dark'
  };

  // 私有方法
  function privateHelper() {
    console.log('This is a private helper function');
  }

  // 返回公有接口
  return {
    getTheme: function() {
      return privateSettings.theme;
    },
    setTheme: function(newTheme) {
      privateSettings.theme = newTheme;
      privateHelper(); // 公有方法可以调用私有方法
    }
  };
})();

console.log(MyModule.getTheme()); // 'dark'
MyModule.setTheme('light');
console.log(MyModule.getTheme()); // 'light'

// MyModule.privateHelper(); // Error: privateHelper is not a function
// console.log(MyModule.privateSettings); // undefined
```
立即执行函数表达式（IIFE）创建了一个独立的作用域，返回的公有方法形成了闭包，使得这些方法可以持续访问模块内部的私有变量和函数。

---

### 3. 柯里化与部分应用 (Currying and Partial Application)

柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。这通常通过闭包来实现。

**场景：** 创建一个通用函数，通过预先提供一些参数来生成一个更专用、更简单的函数。

**例子：创建一个通用的“问候”函数**
```javascript
function greet(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet('Hello');
const sayHi = greet('Hi');

console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHi('Bob')); // "Hi, Bob!"
```
`sayHello` 和 `sayHi` 这两个函数都“记住”了它们被创建时传入的 `greeting` 参数（`'Hello'` 和 `'Hi'`），这就是闭包在起作用。

---

### 4. 在异步编程中保存状态 (Maintaining State in Async Calls)

在事件处理、定时器（`setTimeout`, `setInterval`）或 Ajax 请求等异步操作中，闭包常用于保存函数执行时的上下文状态。

**场景：** 在循环中给多个元素绑定事件，需要知道每个元素的索引或其他信息。

**例子：循环中给按钮绑定事件**
```javascript
// 没有闭包（常见问题）
for (var i = 0; i < 3; i++) {
  // var 声明的 i 是函数级作用域
  const button = document.createElement('button');
  button.textContent = `Button ${i}`;
  button.addEventListener('click', function() {
    console.log(`Clicked button: ${i}`); // 总是输出 "Clicked button: 3"
  });
  document.body.appendChild(button);
}
// 因为 var i 被提升，循环结束后 i 的值为 3。所有点击事件回调都共享同一个 i。

// 使用闭包（IIFE）解决
for (var i = 0; i < 3; i++) {
  (function(index) {
    // 每个 IIFE 都创建了一个新的作用域，保存了当前循环的 index 值
    const button = document.createElement('button');
    button.textContent = `Button ${index}`;
    button.addEventListener('click', function() {
      console.log(`Clicked button: ${index}`); // 正确输出 0, 1, 2
    });
    document.body.appendChild(button);
  })(i); // 立即传入当前的 i 值
}

// 现代解决方案：使用 let（其块级作用域本质上也是闭包的一种体现）
for (let i = 0; i < 3; i++) {
  // let 为每个循环迭代创建一个新的块级作用域
  const button = document.createElement('button');
  button.textContent = `Button ${i}`;
  button.addEventListener('click', function() {
    console.log(`Clicked button: ${i}`); // 正确输出 0, 1, 2
  });
  document.body.appendChild(button);
}
```
事件处理函数形成了一个闭包，它“记住”了定义时所在的作用域（IIFE 或 `let` 块）中的变量 `index` 或 `i`。

---

### 5. 函数工厂 (Function Factory)

根据不同的参数，动态地生成具有不同行为的新函数。

**例子：创建不同倍数的乘法器**
```javascript
function createMultiplier(multiplyBy) {
  return function(x) {
    return x * multiplyBy;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```
`double` 和 `triple` 这两个函数都是“函数工厂”生产出来的，它们各自记住了自己的因子（`2` 和 `3`）。

### 注意事项：内存泄漏

闭包的一个潜在缺点是可能导致内存无法被垃圾回收（GC）。因为内部函数持有对外部函数作用域的引用，所以即使外部函数执行完毕，其作用域内的变量也不会被释放，除非内部函数的引用被清除（例如，将事件监听器移除）。在不需要闭包时，及时解除对函数的引用是一个好习惯。

### 总结

| 应用场景 | 核心价值 |
| :--- | :--- |
| **数据私有化** | 创建私有变量，实现面向对象中的封装特性。 |
| **模块化开发** | 构建独立的、拥有私有状态的代码模块。 |
| **柯里化** | 生成功能更专一、配置性更强的函数。 |
| **异步状态保持** | 在回调函数中准确访问定义时的上下文数据。 |
| **函数工厂** | 动态地、批量地生产功能相似的函数。 |

闭包是 JavaScript  functional programming（函数式编程）和强大表现力的基石，理解并善用闭包是成为一名高级 JavaScript 开发者的关键一步。