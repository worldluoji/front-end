# router
前端路由是指在单页面应用（SPA）中，通过 JavaScript 实现的一种页面导航方式，使用户在浏览网站时无需重新加载整个页面，
而是通过切换视图来展示不同的内容。前端路由的实现通常基于浏览器的 History API 或 Hash（#）来管理 URL 和页面状态。

<br>

## 基础概念
「路由器（Router）：」 前端路由的核心是路由器，它负责监听 URL 的变化并决定何时加载哪个组件或视图。路由器通常会维护一个路由表，将 URL 和对应的组件或视图进行映射。

「路由表（Route Table）：」 路由表是路由器中存储的一种数据结构，用于将 URL 映射到相应的组件或视图。路由表可以手动配置，也可以通过自动化工具生成。

「路由视图（Route View）：」 路由视图是指在页面中展示的特定组件或视图，它根据当前 URL 从路由表中选择对应的内容进行显示。当用户在应用中导航时，路由视图会动态更新以显示相应的页面。

「路由参数（Route Parameters）：」 有时，URL 中包含一些动态的数据，例如文章 ID、用户 ID 等。这些数据可以通过路由参数传递给相应的组件，以便在页面中显示相关的内容。

「导航守卫（Navigation Guards）：」 导航守卫是一种机制，用于在导航发生之前或之后执行一些逻辑。例如，可以在导航到某个页面前检查用户是否有权限访问该页面。常见的导航守卫有路由的beforeEach、beforeResolve和afterEach等。

「History API 和 Hash 模式：」 前端路由通常使用浏览器的 History API 或 Hash 来实现。History API 允许更友好的 URL，而 Hash 模式则通过在 URL 中使用#来避免刷新页面。例如，/users/1（History API）和/#/users/1（Hash 模式）都可以表示相同的路由。

<br>

## React路由选择
- React Router：React Router仍然是处理 React 应用中路由的「第一选择」。凭借其丰富的文档和积极的社区，它继续是我们应用中声明性路由的可靠选择。
- React Query：在 2023 年的普及基础上，Tanstack 的 React Query 将进一步增强数据获取和状态管理。它简化了在 React 应用中管理、缓存和同步数据的过程。
- Next.js：Next.js，建立在 React 之上的框架，它作为服务器渲染 React 应用的首选选择，并提供灵活的路由选项。