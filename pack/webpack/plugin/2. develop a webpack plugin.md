# develop a webpack plugin
一个webpack plugin由一下几个步骤组成：
- 一个JavaScript类函数。
- 在函数原型 (prototype)中定义一个注入compiler对象的apply方法。
- apply函数中通过compiler插入指定的事件钩子,在钩子回调中拿到compilation对象
- 使用compilation操纵修改webapack内部实例数据。
- 异步插件，数据处理完后使用callback回调

开发webpack插件还需要了解其中两个核心的对象引用**Compiler 和 Compilation**，这里需要理解清楚他们的含义。

- **compiler 对象代表了完整的 webpack 环境配置**。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
- **compilation 对象代表了一次资源版本构建**。它包含了有关当前编译的所有信息。compilation对象允许您访问编译过程中产生的所有模块、资产（assets）、缓存信息以及其他有用的数据。


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

<br>

## beforeCompile
`beforeCompile` 是一个Webpack钩子，它在编译过程开始之前被触发。这个钩子非常有用，因为它允许您在Webpack开始实际编译之前做一些准备工作，比如修改Webpack配置、预处理文件等。

### 使用 `beforeCompile` 钩子

让我们来看一个简单的示例，展示如何使用 `beforeCompile` 钩子来修改Webpack配置。在这个示例中，我们将根据当前的环境变量来动态修改Webpack配置。

#### 步骤 1: 创建自定义插件

首先，我们需要创建一个自定义插件类，该类将实现 `beforeCompile` 钩子。

```javascript
class MyCustomWebpackPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tap('MyCustomWebpackPlugin', (params) => {
      // 这里可以访问compiler和params
      // params 是一个包含当前编译参数的对象
      // 我们可以在这里修改compiler.options来更改Webpack配置

      // 例如，根据环境变量来修改输出路径
      if (process.env.NODE_ENV === 'production') {
        compiler.options.output.path = path.resolve(__dirname, 'build/prod');
      } else {
        compiler.options.output.path = path.resolve(__dirname, 'build/dev');
      }

      console.log('Before compile hook triggered!');
    });
  }
}

module.exports = MyCustomWebpackPlugin;
```

#### 步骤 2: 在Webpack配置中使用插件

接下来，您需要在Webpack配置文件中引入并使用这个自定义插件。

```javascript
const path = require('path');
const MyCustomWebpackPlugin = require('./my-custom-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new MyCustomWebpackPlugin()
  ],
  // ...
};
```

### 详细解释

1. **创建插件类**:
   - 创建一个名为 `MyCustomWebpackPlugin` 的类，该类有一个 `apply` 方法。
   - 在 `apply` 方法中，我们使用 `beforeCompile` 钩子来注册一个回调函数。

2. **使用 `beforeCompile` 钩子**:
   - `beforeCompile` 钩子接受一个参数 `params`，这是一个包含当前编译参数的对象。
   - 在回调函数中，您可以访问 `compiler` 对象，这是当前的Webpack编译实例。
   - 您可以通过修改 `compiler.options` 来更改Webpack配置。

3. **修改Webpack配置**:
   - 在示例中，我们根据 `NODE_ENV` 环境变量来修改输出路径。
   - 如果 `NODE_ENV` 是 `'production'`，则输出路径更改为 `build/prod`。
   - 如果 `NODE_ENV` 不是 `'production'`，则输出路径更改为 `build/dev`。

### 注意事项

- **异步操作**:
  - 如果您的操作是异步的，您应该使用 `beforeCompile.tapAsync` 或 `beforeCompile.tapPromise` 钩子。
  - 例如，如果您需要从API获取数据来动态修改配置，您应该使用异步钩子。

- **性能影响**:
  - 修改Webpack配置可能会影响性能，尤其是在开发环境中。
  - 如果您预计修改配置会频繁发生，请考虑缓存配置或使用更高效的方法。

- **测试**:
  - 在使用自定义插件之前，请确保对其进行充分测试，特别是在生产环境中。

通过使用 `beforeCompile` 钩子，您可以实现非常灵活的Webpack配置管理，从而根据不同的环境或需求来动态调整Webpack的行为。

<br>

## compilation
在Webpack插件中，`compilation`对象是非常重要的，因为它包含了有关当前编译的所有信息。`compilation`对象允许您访问编译过程中产生的所有模块、资产（assets）、缓存信息以及其他有用的数据。

在下面示例中，`compilation`对象是在`emit`钩子中被传递进来的。`emit`钩子会在所有的模块和资产已经完成处理之后触发，但在这个阶段资产还没有被写入磁盘。这意味着您可以在`emit`阶段对资产做一些最后的修改。

让我们来看一下如何使用`compilation`对象。假设您想要在每个输出文件的顶部添加一些注释，您可以在`tapAsync`回调函数中这样操作：

```javascript
class MyCustomWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyCustomWebpackPlugin', (compilation, callback) => {
      // 获取所有输出的资产
      const assets = compilation.assets;

      // 遍历所有资产
      Object.keys(assets).forEach((assetName) => {
        // 获取当前资产的内容
        let assetContent = assets[assetName].source();

        // 添加自定义的注释
        assetContent = `/* This file was generated by MyCustomWebpackPlugin */\n${assetContent}`;

        // 更新资产的内容
        assets[assetName] = {
          source: () => assetContent,
          size: () => Buffer.byteLength(assetContent)
        };
      });

      // 完成处理后调用callback
      callback();
    });
  }
}

module.exports = MyCustomWebpackPlugin;
```

这里的关键点是：

- `compilation.assets` 是一个包含所有输出资产的对象，键是文件名，值是代表文件内容的对象。
- 每个资产对象都有 `source()` 方法，它返回资产的源代码字符串。
- 每个资产对象还有 `size()` 方法，它返回资产的大小（以字节为单位）。
- 我们可以通过更新 `compilation.assets` 中的键值来修改输出文件的内容。

在上述示例中，我们遍历了`compilation.assets`中的每个资产，并在每个文件的顶部添加了一个自定义注释。我们还需要确保更新后的资产具有正确的 `source()` 和 `size()` 方法。

请注意，您需要确保在异步钩子（如`tapAsync`）中正确地调用`callback`函数，以告知Webpack插件已完成其任务。

如果您需要在编译的不同阶段进行操作，Webpack提供了许多其他钩子，如`beforeCompile`、`afterCompile`等，您可以在这些钩子中使用`compilation`对象来访问编译的信息并进行相应的操作。


## 相关的hooks
- https://www.webpackjs.com/api/compiler-hooks/
- https://www.webpackjs.com/api/compilation-hooks/