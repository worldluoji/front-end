# router
前端路由是指在单页面应用（SPA）中，通过 JavaScript 实现的一种页面导航方式，使用户在浏览网站时无需重新加载整个页面，
而是通过切换视图来展示不同的内容。前端路由的实现通常基于浏览器的 History API 或 Hash（#）来管理 URL 和页面状态。

## 基础概念
「路由器（Router）：」 前端路由的核心是路由器，它负责监听 URL 的变化并决定何时加载哪个组件或视图。路由器通常会维护一个路由表，将 URL 和对应的组件或视图进行映射。

「路由表（Route Table）：」 路由表是路由器中存储的一种数据结构，用于将 URL 映射到相应的组件或视图。路由表可以手动配置，也可以通过自动化工具生成。

「路由视图（Route View）：」 路由视图是指在页面中展示的特定组件或视图，它根据当前 URL 从路由表中选择对应的内容进行显示。当用户在应用中导航时，路由视图会动态更新以显示相应的页面。

「路由参数（Route Parameters）：」 有时，URL 中包含一些动态的数据，例如文章 ID、用户 ID 等。这些数据可以通过路由参数传递给相应的组件，以便在页面中显示相关的内容。

「导航守卫（Navigation Guards）：」 导航守卫是一种机制，用于在导航发生之前或之后执行一些逻辑。例如，可以在导航到某个页面前检查用户是否有权限访问该页面。常见的导航守卫有路由的beforeEach、beforeResolve和afterEach等。

「History API 和 Hash 模式：」 前端路由通常使用浏览器的 History API 或 Hash 来实现。History API 允许更友好的 URL，而 Hash 模式则通过在 URL 中使用#来避免刷新页面。例如，/users/1（History API）和/#/users/1（Hash 模式）都可以表示相同的路由。

<br>

## react-router 和 react-router-dom
`react-router` 和 `react-router-dom` 的使用场景主要取决于你的应用运行的环境以及你所使用的 React 生态系统中的其他工具。下面是它们各自的主要使用场景：

### react-router

- **跨平台路由**：`react-router` 是一个与渲染环境无关的核心库，适用于任何环境中构建的 React 应用程序，无论是 Web、React Native 还是服务器端渲染（SSR）。
- **自定义集成**：如果你正在构建一个非标准的或高度定制化的应用程序，可能需要直接使用 `react-router` 提供的基础组件和钩子来实现特定的需求。
- **多平台共享逻辑**：当你希望在多个平台上共享路由逻辑时，比如同时开发 Web 和移动应用，你可以使用 `react-router` 来编写一次路由逻辑，并根据不同的平台选择合适的路由器包。

### react-router-dom

- **Web 应用**：`react-router-dom` 是专门为 Web 应用设计的，它提供了浏览器特有的功能，如 `BrowserRouter` 和 `HashRouter`，用于管理浏览器的历史记录和 URL 状态。
- **单页应用 (SPA)**：对于大多数单页应用来说，`react-router-dom` 提供了必要的工具来创建动态更新的用户界面而无需重新加载整个页面。
- **链接和导航**：`react-router-dom` 包含了 `Link` 组件，使得开发者可以方便地在应用的不同页面之间创建链接，同时保持良好的用户体验。
- **表单处理和数据获取**：`react-router-dom` 还提供了诸如 `useParams`、`useNavigate` 等钩子，帮助开发者更轻松地处理表单提交、查询参数、以及基于路径的数据获取。

总的来说，`react-router-dom` 是 `react-router` 的一个具体实现，专注于为 Web 应用提供最佳实践和支持。如果你的应用是针对浏览器环境的，那么 `react-router-dom` 会是你的首选。而如果你的应用需要跨越多个平台或有特殊的路由需求，则可以直接使用 `react-router` 并结合其他适配器或自行实现所需的特性。

<br>

## useParams 和 useNavigate
`useParams` 和 `useNavigate` 是为了帮助开发者更方便地访问路由参数和执行导航操作。下面分别介绍这两个钩子的使用方法：

### useParams

`useParams` 钩子用于获取当前 URL 中的动态参数。例如，如果你有一个路径 `/users/:id`，那么 `:id` 就是一个动态参数。

#### 使用示例：
假设你有一个用户详情页面，其路径为 `/users/:id`，你可以使用 `useParams` 来获取当前用户的 ID。

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  let { id } = useParams();

  return (
    <div>
      <h1>User Details for user {id}</h1>
      {/* 这里可以添加更多逻辑来展示特定用户的详细信息 */}
    </div>
  );
}

export default UserDetails;
```

### useNavigate

`useNavigate` 钩子提供了编程式的导航功能，允许你在代码中触发导航行为，而不是通过点击链接或按钮等用户交互方式。

#### 使用示例：
在某些情况下，比如表单提交成功后，你可能想要重定向到另一个页面。此时就可以使用 `useNavigate`。

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 模拟登录逻辑
    if (username === 'admin') {
      // 登录成功，重定向到主页或其他页面
      navigate('/home', { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter username"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
```

- `navigate('/home')`：导航到指定路径。
- `navigate('/home', { replace: true })`：使用 `replace: true` 选项会替换当前条目而不向历史堆栈中添加新条目，这通常用于避免用户按返回按钮回到前一页。
- `navigate(-1)` 或 `navigate(1)`：可以通过传递一个正数或负数来前进或后退指定数量的历史记录条目。

这些钩子使得与路由的互动变得更加直观和直接，增强了应用的用户体验。

<br>

## React路由选择
- React Router：React Router仍然是处理 React 应用中路由的「第一选择」。凭借其丰富的文档和积极的社区，它继续是我们应用中声明性路由的可靠选择。
- React Query：在 2023 年的普及基础上，Tanstack 的 React Query 将进一步增强数据获取和状态管理。它简化了在 React 应用中管理、缓存和同步数据的过程。
- Next.js：Next.js，建立在 React 之上的框架，它作为服务器渲染 React 应用的首选选择，并提供灵活的路由选项。