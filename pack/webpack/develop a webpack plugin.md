# develop a webpack plugin
一个webpack plugin由一下几个步骤组成：
- 一个JavaScript类函数。
- 在函数原型 (prototype)中定义一个注入compiler对象的apply方法。
- apply函数中通过compiler插入指定的事件钩子,在钩子回调中拿到compilation对象
- 使用compilation操纵修改webapack内部实例数据。
- 异步插件，数据处理完后使用callback回调

开发webpack插件还需要了解其中两个核心的对象引用**Compiler 和 Compilation**，这里需要理解清楚他们的含义。

- **compiler 对象代表了完整的 webpack 环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
- **compilation 对象代表了一次资源版本构建**。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。


`Tapable`是Webpack的核心概念之一，它提供了一种机制来定义插件系统。Tapable允许插件在构建过程中特定的时间点插入代码，从而扩展Webpack的行为。了解如何使用Tapable可以帮助你更好地理解Webpack的工作原理，并且可以让你创建自己的Webpack插件。

### Tapable 的基本概念

`Tapable` 提供了两种主要的钩子类型：

1. **Sync Hook** (同步钩子)：这些钩子在调用时会等待所有注册的监听器完成后再继续执行。
2. **Async Hook** (异步钩子)：这些钩子允许监听器以异步的方式执行，并在完成后回调。

### Tapable 的基本使用
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");
```
一共9个Hook.

#### 安装 Tapable

首先，你需要安装 `tapable` 包。如果你想要创建一个Webpack插件，通常不需要显式安装 `tapable`，因为Webpack已经包含了 `tapable`。

#### 创建一个简单的 Sync Hook

**SyncHook**:
- 所有监听器同步执行。
- 不需要回调函数。
- 适用于不需要等待异步操作完成的场景。

下面是一个简单的同步钩子的例子：

```javascript
const { SyncHook } = require('tapable');

// 创建一个 SyncHook 实例
const myHook = new SyncHook(['arg1', 'arg2']);

// 注册监听器
myHook.tap('listener1', (arg1, arg2) => {
  console.log(`Listener 1: ${arg1}, ${arg2}`);
});

myHook.tap('listener2', (arg1, arg2) => {
  console.log(`Listener 2: ${arg1}, ${arg2}`);
});

// 触发钩子
myHook.call('hello', 'world');
```

在这个例子中，我们创建了一个 `SyncHook` 类型的钩子，并注册了两个监听器。当我们调用 `call` 方法时，所有注册的监听器都会按顺序执行。

#### 创建一个简单的 Async Hook

对于异步钩子，可以使用 `AsyncParallelHook` 或 `AsyncSeriesHook`。

**AsyncParallelHook**:
- 所有监听器并行执行。
- 适用于没有依赖关系的异步任务。

**AsyncSeriesHook**:
- 监听器按顺序异步执行。
- 每个监听器必须通过回调函数通知 Tapable 它已经完成。
- 适用于需要按照特定顺序执行的异步任务。


这里展示一个 `AsyncSeriesHook` 的例子：

```javascript
const { AsyncSeriesHook } = require('tapable');

// 创建一个 AsyncSeriesHook 实例
const asyncHook = new AsyncSeriesHook(['arg1', 'arg2']);

// 注册监听器
asyncHook.tapAsync('listener1', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 1: ${arg1}, ${arg2}`);
    callback();
  }, 1000);
});

asyncHook.tapAsync('listener2', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Listener 2: ${arg1}, ${arg2}`);
    callback();
  }, 1000);
});

// 触发钩子
asyncHook.callAsync('hello', 'world', (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('All listeners have completed.');
  }
});
```

在这个例子中，我们创建了一个 `AsyncSeriesHook` 类型的钩子，并注册了两个异步监听器。每个监听器都会通过 `callback` 函数来通知钩子已执行完毕。

### 使用 Tapable 创建 Webpack 插件

要创建一个Webpack插件，你需要继承 `Compiler` 或 `Compilation` 类，并使用它们提供的钩子来扩展Webpack的行为。

下面是一个简单的Webpack插件示例，该插件将在编译开始时打印一条消息：

```javascript
const { SyncHook } = require('tapable');

class MyWebpackPlugin {
  apply(compiler) {
    // 注册一个监听器来监听编译开始的事件
    compiler.hooks.compile.tap('MyWebpackPlugin', () => {
      console.log('Compilation started!');
    });

    // 创建一个自定义的 SyncHook
    const customHook = new SyncHook([]);

    // 注册一个监听器
    customHook.tap('customListener', () => {
      console.log('Custom hook triggered!');
    });

    // 触发自定义钩子
    customHook.call();
  }
}

module.exports = MyWebpackPlugin;
```

在 `webpack.config.js` 中使用这个插件：

```javascript
const MyWebpackPlugin = require('./MyWebpackPlugin');

module.exports = {
  // ... 其他配置
  plugins: [
    new MyWebpackPlugin(),
  ],
};
```