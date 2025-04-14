# useTransition
React 18 中，Transitions 是一个强大的新特性，它为开发者提供了一种优化用户界面更新的方式。它把代价大的 state 更新标记为非关键的 transition，把它在调度器里的优先级排到关键更新之后, 能够显著提升应用的性能和用户体验。

```
startTransition(() => {/* 省略 */});
//              -----------------
//                      ^
//                      |
//                 scope回调函数


const [isPending, startTransition] = useTransition();
//     ---------  ---------------
//         ^                  ^
//         |                  |
// 是否存在待执行的transition  与startTransition API相同的函数
```
React 18 要求上面的回调函数整体是同步的，如果其中包含了异步（如 async 、 setTimeout ）的代码，这部分代码中的 state 更新不会被标记为 transition。而从新版的 React 19 开始，transition 的回调函数可以是异步函数了。

对这类异步函数使用 transition，我们可以获得以下收益：
- 提升组件性能，不会阻塞关键交互，为用户带来更平滑的体验。
- 短时间内多次请求服务器端有可能会产生竞争条件（Race Condition）问题，导致组件多次渲染，用户会看到中间的一些更新一闪而过；而使用 transition 包裹异步请求逻辑，同时存在的 transitions 会被合并，只有最后一次 state 更新会被真正渲染出来，用户只会看到最终结果。
- 一个 transition 会自动维护其待定（pending）状态，transition 开始时为true ，结束时改为false ，可以代替开发者手工维护的“读取中（loading）” state。

React 19 将用于触发 transition 的函数，无论是异步还是同步，统称为 action（动作）。从概念上讲，这个 action 与 Redux 中的 action 是类似的，都代表了一定的意图并最终更新 state。

---

**一、Transitions 的作用**

1. 区分紧急更新和非紧急更新
   - React 18 可以区分紧急更新和非紧急更新，紧急更新通常是对用户交互的直接响应，比如按钮点击、输入框输入等。非紧急更新则可能是一些后台数据加载完成后的界面更新，或者是一些动画效果的触发。
   - Transitions 主要针对非紧急更新进行优化。在 transition 执行过程中，调度器每 5 毫秒都会把控制权交还给主进程，检查是否有其他更重要的工作单元，如果有就暂停 transition，这样就可以进一步避免阻塞 UI。

2. 提供流畅的过渡效果
   - Transitions 可以为界面的更新提供流畅的过渡效果。例如，当数据加载完成后，界面元素的出现可以通过淡入、滑动等过渡效果来呈现，而不是突然出现，这样可以让用户更容易理解界面的变化，提高用户体验。

**二、如何使用 Transitions**

1. 使用 `startTransition` 函数
   - `startTransition` 函数是 React 18 中用于标记非紧急更新的方法。你可以将那些可能会导致界面重新渲染的操作包裹在 `startTransition` 函数中，告诉 React 这些更新是非紧急的。
   - 例如：
     ```javascript
     import { startTransition } from 'react';

     function handleInputChange(event) {
       startTransition(() => {
         setInputValue(event.target.value);
       });
     }
     ```
   - 在上面的例子中，当输入框的值发生变化时，使用 `startTransition` 函数将更新 `inputValue` 的操作标记为非紧急更新。这样，React 会优先处理紧急更新，如用户的输入交互，然后再处理非紧急的界面更新。

2. 使用 `useTransition` 钩子

示例：
```jsx
// Using pending state from Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      } 
      redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```
The async transition will immediately set the isPending state to true, make the async request(s), and switch isPending to false after any transitions. This allows you to keep the current UI responsive and interactive while the data is changing.

这样，自动设置isPending，不用开发者去处理。

---

**三、Transitions 的优势**

1. 提高性能
   - 通过延迟非紧急更新的渲染，React 可以更有效地利用浏览器的空闲时间来处理这些更新，从而减少卡顿和提高性能。

2. 增强用户体验
   - 流畅的过渡效果可以让用户更容易理解界面的变化，提高用户体验。同时，优先处理紧急更新可以确保用户的交互得到及时响应。

3. 简化代码
   - 使用 `startTransition` 和 `useTransition` 可以使代码更加清晰和易于维护。开发者可以明确地标记哪些更新是非紧急的，从而更好地控制应用的性能和用户体验。
