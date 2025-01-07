# createMemoryHistory
`createMemoryHistory` 是 Vue Router 提供的一种历史管理方式，它主要用于非浏览器环境或不需要与浏览器地址栏进行交互的场景。比如在服务端渲染（SSR）、测试环境中，或者是像 Electron 这样的桌面应用程序中。

### 作用

- **非浏览器环境兼容**：在一些环境下（如Node.js），由于没有浏览器提供的 `window.history` API，因此无法使用 `createWebHistory` 或者 `createWebHashHistory`。这时可以使用 `createMemoryHistory` 来模拟一个内存中的历史堆栈。
  
- **状态保持**：`createMemoryHistory` 使用内存来保存导航的历史记录，这意味着当应用关闭或者页面刷新时，这个历史记录会被重置，因为它是存储在内存中的，不会持久化。

- **灵活性**：它允许开发者在没有真实URL变更的情况下改变路由，这在某些特定的应用场景中是非常有用的，例如单页应用（SPA）内部的状态管理，或是创建一个多步表单向导，其中用户可以在不触发实际页面加载的情况下前进和后退。

### 使用方法

在 Vue Router 4 中，你可以通过如下代码创建一个基于内存的历史对象：

```javascript
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [...], // 路由配置
})
```

需要注意的是，如果你的应用是运行在一个有浏览器环境的地方，并且你希望用户的浏览行为能够反映到浏览器的地址栏上，那么你应该选择 `createWebHistory` 或者 `createWebHashHistory`，而不是 `createMemoryHistory`。