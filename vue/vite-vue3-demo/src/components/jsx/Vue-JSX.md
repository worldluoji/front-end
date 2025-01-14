# Vue JSX
Vue 的 JSX 转换方式与 React 中 JSX 的转换方式不同，因此你不能在 Vue 应用中使用 React 的 JSX 转换。与 React JSX 语法的一些明显区别包括：
- 可以使用 HTML attributes 比如 class 和 for 作为 props - 不需要使用 className 或 htmlFor。
- 传递子元素给组件 (比如 slots) 的方式不同。


## Vue JSX 与React JSX 的区别
Vue 3 和 React 都支持 JSX (JavaScript XML) 语法，允许开发者在 JavaScript 中编写类似 HTML 的代码。然而，由于两者是不同的框架，它们对 JSX 的实现和处理有一些区别：

### 绑定方式

- **React**: 在 React 中，属性绑定使用花括号 `{}` 直接嵌入表达式或变量。例如：`<div className={styles}>Hello</div>`。
- **Vue 3**: Vue 也使用花括号 `{}` 进行属性绑定，但是它区分了静态和动态属性。对于静态属性，你可以直接写属性名；对于动态属性，则需要使用 `v-bind:` 或简写的 `:`。例如：`<div :class="styles">Hello</div>`。

### 指令系统

- **React**: 没有内置的指令系统，所有的逻辑都通过 JavaScript 实现。例如条件渲染、列表渲染等都是通过 JavaScript 的三元运算符、`&&` 运算符或者 `.map()` 方法来完成。
- **Vue 3**: 支持指令（如 `v-if`, `v-for`, `v-model` 等），这些指令提供了简洁的语法糖来处理常见的 DOM 操作。例如，`v-if` 可以用来根据条件渲染元素，`v-for` 用于循环生成列表。

### 事件处理

- **React**: 使用 `onClick`, `onChange` 等原生事件名称，并且通常需要显式地传递合成事件对象作为参数给事件处理器。
- **Vue 3**: 使用 `@click`, `@input` 等缩写的事件监听器，可以更方便地绑定事件处理器。同时，Vue 的事件处理器默认接收事件对象作为第一个参数，除非你明确指定其他参数。

### 内置组件

- **React**: 没有特别定义的内置组件，所有组件都是用户自定义的。
- **Vue 3**: 提供了一些内置组件，比如 `<Transition>` 和 `<KeepAlive>`，可以直接在 JSX 中使用。

### JSX 编译目标

- **React**: JSX 被编译为 `React.createElement` 调用，这是 React 创建虚拟 DOM 节点的方式。
- **Vue 3**: JSX 被编译为 `_createVNode` 调用，这是 Vue 创建虚拟节点的方法。

### 类型检查

- **React**: 如果你使用 TypeScript，React 的 JSX 支持良好的类型推断和类型检查。
- **Vue 3**: 同样与 TypeScript 兼容良好，但需要注意的是，在使用 JSX 时可能需要额外配置来确保类型安全，因为 Vue 的 JSX 支持相对较为新。

### 性能优化

- **React**: 使用了 Fiber 架构来进行异步渲染，这使得它可以更好地处理复杂的更新场景。
- **Vue 3**: 引入了基于 Proxy 的响应式系统以及编译期优化，如静态树提升和静态属性提升，以提高性能。


## reference
https://cn.vuejs.org/guide/extras/render-function.html#JSX%20/%20TSX