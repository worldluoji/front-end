# useTransition
React 18 中，Transitions 是一个强大的新特性，它为开发者提供了一种优化用户界面更新的方式，能够显著提升应用的性能和用户体验。

**一、Transitions 的作用**

1. 区分紧急更新和非紧急更新
   - React 18 可以区分紧急更新和非紧急更新，紧急更新通常是对用户交互的直接响应，比如按钮点击、输入框输入等。非紧急更新则可能是一些后台数据加载完成后的界面更新，或者是一些动画效果的触发。
   - Transitions 主要针对非紧急更新进行优化，通过延迟非紧急更新的渲染，使得紧急更新能够优先处理，从而提高应用的响应速度。

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

**三、Transitions 的优势**

1. 提高性能
   - 通过延迟非紧急更新的渲染，React 可以更有效地利用浏览器的空闲时间来处理这些更新，从而减少卡顿和提高性能。

2. 增强用户体验
   - 流畅的过渡效果可以让用户更容易理解界面的变化，提高用户体验。同时，优先处理紧急更新可以确保用户的交互得到及时响应。

3. 简化代码
   - 使用 `startTransition` 和 `useTransition` 可以使代码更加清晰和易于维护。开发者可以明确地标记哪些更新是非紧急的，从而更好地控制应用的性能和用户体验。
