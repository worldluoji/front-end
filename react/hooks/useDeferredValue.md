## useDeferredValue
startTransition 可以用来标记低优先的 state 更新；
而 useDeferredValue 可以用来标记低优先的变量。

`useDeferredValue` 是 React 18 引入的一个 Hook，用于优化用户体验。它允许你创建一个“延迟”的值，这个值的更新可以被推迟到浏览器的下一个空闲周期。这意味着如果页面正在执行一些高优先级的任务（比如渲染重要的用户界面更新），那么这些任务会被优先处理，而 `useDeferredValue` 控制的更新则会被延迟。

### 基本用法

假设你有一个搜索组件，当用户输入查询时，你希望搜索结果能够平滑地更新，而不是立即响应每个按键。你可以使用 `useDeferredValue` 来实现这一目标。

```jsx
import React, { useState, useDeferredValue } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');
  // 创建一个延迟的 query 值
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* 使用 deferredQuery 来显示搜索结果 */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

function SearchResults({ query }) {
  // 这里是模拟的搜索逻辑
  return (
    <ul>
      {['Result 1', 'Result 2', 'Result 3'].map((result, index) => (
        <li key={index}>
          {result}: {query}
        </li>
      ))}
    </ul>
  );
}
```

在这个例子中，`query` 是用户输入的即时值，而 `deferredQuery` 是 `useDeferredValue` 创建的延迟值。当 `query` 发生变化时，React 会尝试在下一个渲染周期中更新 `deferredQuery`，但如果当前有更高优先级的工作需要完成，React 会推迟这个更新直到系统空闲。

React 19 为 useDeferredValue 提供了第二个参数，用于设置默认值。
```jsx
function Search({deferredValue}) {
  // On initial render the value is ''.
  // Then a re-render is scheduled with the deferredValue.
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
```

### 注意事项

- **不要过度使用**：虽然 `useDeferredValue` 可以帮助优化性能，但是过度使用可能会导致用户界面的响应性变差，因为用户可能注意到延迟。
- **适用于非关键路径上的更新**：通常，你应该将 `useDeferredValue` 用于那些对用户体验不是非常关键的更新，例如搜索建议、滚动加载等。
- **与 `useTransition` 配合使用**：有时你可能希望某些操作（如导航或状态切换）立即发生，而其他操作（如数据获取或列表更新）可以稍后发生。在这种情况下，可以结合 `useTransition` 和 `useDeferredValue` 来达到更好的效果。

通过合理使用 `useDeferredValue`，你可以提升应用的性能和用户体验，尤其是在处理大量数据或复杂界面时。