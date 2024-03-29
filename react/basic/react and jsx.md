# React and JSX

## React是什么
React is an Open Source view library created and maintained by Facebook. It's a great tool to render the User Interface (UI) of modern web applications.

React 本身其实是一个非常简单的框架，要理解它的用法，无外乎就是理解下面<strong>三个概念：组件、状态和 JSX</strong>。

总的来说，React 是一套声明式的、组件化的前端框架。

React 的设计哲学 UI=f(state) ，理论上来说，对于给定的 f() 和状态数据，一定可以重现一模一样的 UI；这也意味着，只要状态数据有变化，f()就需要重新执行，整个 UI 需要重新渲染。

<br>

## JSX
JSX lets you use the full programmatic power of JavaScript within HTML, and helps to keep your code readable. For the most part, JSX is similar to the HTML that you have already learned.

在JSX中，<strong>使用大括号，里面就可以写JavaScript</strong>
```
{ showAdd && <KanbanNewCard onSubmit={handleSubmit} /> }
```
主要有两个地方：
- 作为 props 值，如 `<button disabled={showAdd}>添加新卡片</button>`；
- 作为 JSX 元素的子元素，如 `<div className="card-title">{title}</div>`。

JSX is not valid JavaScript, JSX code must be compiled into JavaScript. The transpiler Babel is a popular tool for this process.

JSX例子：
```
const JSX = <h1>Hello JSX!</h1>
```

<strong>JSX必须返回单个元素</strong>：
```
const JSX = <div>
  <h1>Paragraph One</h1>
  <p>Paragraph Two</p>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>
```

JSX注释需要加{}：
```
{/* */} 
```

因为从本质上来说，JSX 并不是一个新的模板语言，而可以认为是一个语法糖:
```
import React from "react";

function CountLabel({count=0}) {  
    // 子组件用于显示颜色  
    const color = count > 3 ? "red" : "blue";  
    return <span style={{ color }}>{ count }</span>;
}

export default function Counter() {
  // 通过 useState 定义这样一个状态，让这个状态来保持计数器的数值，那么在值发生变化时，组件就会自动重新刷新
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        <CountLabel />
      </button>
    </div>
  );
}
```
就等价于：
```
React.createElement(
  "div",
  null,
  React.createElement(
    "button",
    { onClick: function onClick() {
        return setCount(count + 1);
      } },
    React.createElement(CountLabel, { count: count })
  )
);
```
- 第一个参数表示组件的类型；
- 第二个参数是传给组件的属性，也就是 props；
- 第三个以及后续所有的参数则是子组件。
  
这与Vue是类似的。

React 从 17 版本开始已经启用全新的 JSX 运行时来替代 React.createElement

作为编译输入，JSX 的语法没有改变，编译输出无论是 jsx-runtime 还是 React.createElement 函数，它们的返回值也同样都是 React 元素。
可见，代码编译器为开发者隐藏了新旧 API 的差异。这个变化并不影响已有的对 JSX 的理解。

另外，如果是开发者手工创建 React 元素，依旧应该调用 React.createElement 。
这个 API 并不会被移除。而 jsx-runtime 代码只应由编译器生成，开发者不应直接调用这个函数。

<br>

### 规则
- 自定义 React 组件时，组件本身采用的变量名或者函数名，需要以大写字母开头。在 JSX 中编写标签时，HTML 元素名称均为小写字母，自定义组件首字母务必大写。
- props 属性名称，在 React 中使用驼峰命名（camelCase），且区分大小写，比如在 <FileCard filename="文件名" fileName="另一个文件名" /> 中，你可以同时传两个字母相同但大小写不同的属性 ，这与传统的 HTML 属性不同。
- JSX 是声明式的，所以它的内部不应该出现命令式的语句，如 if ... else ...
  
<br>

### JSX 元素类型
React 元素有三种基本类型：
- React 封装的 DOM 元素，如 `<div></div>`、 `<img />` ，这部分元素会最终被渲染为真实的 DOM；
- React 组件渲染的元素，如`<KanbanCard />` ，这部分元素会调用对应组件的渲染方法；
- React Fragment 元素，`<React.Fragment></React.Fragment>` 或者简写成 <></>，这一元素没有业务意义，也不会产生额外的 DOM，主要用来将多个子元素分组。
- 
其他还有 Portal、Suspense 等类型

<br>

### return 语句返回 JSX 时，会看到 将 JSX 包在了一对括号 ( ) 里，为什么？
这是为了避免踏入 JS 自动加分号的陷阱。
```
function Component() {
  return 
    <div>{/*假设这行JSX语句很长，为了提升一些代码可读性才特地换行*/}</div>;
}
```
编译器会生成：
```
function Component() {
  return;
  React.createElement("div", null);
}
```
整个函数短路了！根本不会执行到React.createElement() 语句。为了修正这个问题，我们需要为 JSX 加上括号：
```
function Component() {
  return (
    <div>{/*假设这行JSX语句很长，为了提升一些代码可读性，特地换行*/}</div>
  );
}
```

<br>

### 为什么一个普普通通的function App() {} 函数就成组件了？
函数组件上位的原因：
- React 的哲学 UI=f(state) ；
- 更彻底的关注点分离（Separation Of Concerns）；
- 函数式编程的影响；
- React 内部实现的不断优化；
- 开源社区的反哺。