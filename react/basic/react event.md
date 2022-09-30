# React 合成事件
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