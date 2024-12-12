# use
React 19引入了 use 函数，用于在组件中声明异步操作。
```jsx
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use` will suspend until the promise resolves.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // When `use` suspends in Comments,
  // this Suspense boundary will be shown.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

You can also read context with use, allowing you to read Context conditionally such as after early returns:
```jsx
import {use} from 'react';
import ThemeContext from './ThemeContext'

function Heading({children}) {
  if (children == null) {
    return null;
  }
  
  // This would not work with useContext
  // because of the early return.
  const theme = use(ThemeContext);
  return (
    <h1 style={{color: theme.color}}>
      {children}
    </h1>
  );
}
```
The use API can only be called in render, similar to hooks. Unlike hooks, use can be called conditionally. In the future we plan to support more ways to consume resources in render with use.

## reference
https://react.dev/blog/2024/12/05/react-19#new-feature-use