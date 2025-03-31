# use
React 19 引入了一个新的 use API，旨在简化对异步数据的处理。这个 API 允许你在 React 组件中直接使用 await 关键字来处理异步操作，而不需要手动管理加载状态、错误状态和数据状态。这使得异步数据获取更加直观和简洁。

例如，你可以使用 use 读取一个 promise，React 将挂起，直到 promise 解析完成：
```jsx
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use` 将被暂停直到 promise 被解决.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // 当“use”在注释中暂停时,
  // 将显示此悬念边界。
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

你也可以使用 use 读取 context，这使你能够在如提前返回之后的情况下有条件地读取 Context：
```jsx
import {use} from 'react';
import ThemeContext from './ThemeContext'

function Heading({children}) {
  if (children == null) {
    return null;
  }
  
  // 因为过早的返回
  // 这里 useContext 无法正常工作。
  const theme = use(ThemeContext);
  return (
    <h1 style={{color: theme.color}}>
      {children}
    </h1>
  );
}
```
use API 只能在渲染中被调用，类似于 hooks。与 hooks 不同，use 可以被有条件地调用。

## useEffect 仍然有其不可替代的作用
- 对于那些需要在组件挂载或更新后执行的副作用操作，useEffect 仍然是必需的。例如，设置定时器、添加事件监听器等。
- 在某些复杂场景下，useEffect 提供了更细粒度的控制，比如根据依赖项的变化来决定是否执行副作用。
- use 主要用于简化异步数据获取的处理，允许直接在组件中使用 await 关键字来处理 promise，自动管理加载、错误和数据状态。

## reference
https://zh-hans.react.dev/blog/2024/12/05/react-19#new-feature-use