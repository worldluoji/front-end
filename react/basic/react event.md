# React 事件

## React合成事件
```
<!-- 这是HTML不是JSX -->
<button onclick="handleClick()">按钮</button>
<input type="text" onkeydown="handleKeyDown(event)" />
```
在 React 中，HTML 元素也有类似的、以 on* 开头的事件处理属性。最直接的不同是，这些属性的命名方式遵循驼峰格式（camelCase），
如onClick、onKeyDown:
```
const Component = () => {
  const handleClick = () => {/* ...省略 */};
  const handleKeyDown = evt => {/* ...省略 */};
  return (
    <>
      {/* 这次是JSX了 */}
      <button onClick={handleClick}>按钮</button>
      <input type="text" onKeyDown={evt => handleKeyDown(evt)} />
    </>
  );
};
```
上面的 button 为例，开发者将 handleClick 函数传入 onClick 属性,
这个对象就是 React 中的合成事件（SyntheticEvent）。

合成事件是原生 DOM 事件的一种包装，它与原生事件的接口相同，根据 W3c 规范，
React 内部规范化（Normalize）了这些接口在不同浏览器之间的行为，开发者不用再担心事件处理的浏览器兼容性问题。

<br>

## React合成事件与html事件的区别
### 1. 事件捕获
html:
```
div.addEventListener('click', handleClick, true);
```
React JSX:
```
() => (<div onClickCapture={handleClick}>...</div>);
```
在 React 合成事件中，没有addEventListener方法, 需要用在事件属性后面加一个 Capture 后缀,实现以捕获方式监听事件。

<br>

### 2. React 合成事件规范化了一些在各个浏览器间行为不一致，甚至是在不同元素上行为不一致的事件
在 Chrome 或 Firefox 中，一个文本框 `<input type="text" />` 的 change 事件发生在文本框内容被改变、然后失去焦点的时候。
不过，对一个下拉框`<select>` 的change 事件，Chrome 和老版本 Firefox（v63 以前）就有分歧了，
前者每次按下键盘箭头键都会触发 change 事件，但后者只有下拉框失去焦点时才会触发。

在 React 中，`<input>` 、`<textarea>` 和 `<select>` 三种表单元素的onChange 合成事件被规范成了一致的行为：
在不会导致显示抖动的前提下，表单元素值的改变会<strong>尽可能及时地触发</strong>这一事件。

除了 onChange ，合成事件也规范化了 onBeforeInput 、 onMouseEnter 、 onMouseLeave 、 onSelect 。

<br>

### 3. 什么时候使用原生 DOM 事件？
一般情况下，React 的合成事件已经能满足你的大部分需求了，有两种情况例外。

1) 需要监听 React 组件树之外的 DOM 节点的事件，这也包括了 window 和 document 对象的事件。
注意注意的是，在组件里监听原生 DOM 事件，属于典型的副作用，所以请务必在 useEffect 中监听，并在清除函数中及时取消监听,例如：
```
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return function cleanup() {
    window.removeEventListener('resize', handleResize);
  };
}, []);

```

2) 很多第三方框架，尤其是与 React 异构的框架，在运行时会生成额外的 DOM 节点。
在 React 应用中整合这类框架时，常会有非 React 的 DOM 侵入 React 渲染的 DOM 树中。
当需要监听这类框架的事件时，要监听原生 DOM 事件，而不是 React 合成事件。这同样也是 useEffect 或 useLayoutEffect 的领域。

<br>

## React事件说明
在 React 17 之前，所有的事件都是绑定在 document 上的，而从 React 17 开始，所有的事件都绑定在整个 App 上的根节点上，
这主要是为了以后页面上可能存在多版本 React 的考虑：
- 第一，虚拟 DOM render 的时候， DOM 很可能还没有真实地 render 到页面上，所以无法绑定事件。
- 第二，React 可以屏蔽底层事件的细节，避免浏览器的兼容性问题。同时呢，对于 React Native 这种不是通过浏览器 render 的运行时，也能提供一致的 API。

为什么事件绑定在某个根节点上，也能触发实际 DOM 节点的事件？
我们知道，在浏览器的原生机制中，事件会从被触发的节点往父节点冒泡，然后沿着整个路径一直到根节点，所以根节点其实是可以收到所有的事件的。这也称之为浏览器事件的冒泡模型。

<br>

## 自定义事件
虽然自定义事件和原生事件看上去类似，但是两者的机制是完全不一样的：
- 原生事件是浏览器的机制；
- 自定义事件则是纯粹的组件自己的行为，本质是一种回调函数机制。

在 React 中，自定义事件不用通过任何特殊的 API，只需要通过 props 给组件传递一个回调函数，
然后在组件中的某个时机，比如用户输入，或者某个请求完成时，去调用这个传过来的回调函数就可以了。

习惯上会将这样的回调函数命名为 onSomething 这种以“ on ”开头的名字，方便在使用的时候理解。

```
import { useState } from "react";

// 创建一个无状态的受控组件
function ToggleButton({ value, onChange }) {
  const handleClick = () => {
    onChange(!value);
  };
  return (
    <button style={{ width: "60px" }} onClick={handleClick}>
      <span>{value ? "On" : "Off"}</span>
    </button>
  );
}
```
这里的自定义事件，就是定义了一个 onChange 这样的属性，允许传递一个回调函数给这个组件，
在某个时机去调用这个回调函数，从而实现事件的功能。