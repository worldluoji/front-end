# slot
在 Vue 3 和 React 中，**插槽（Slot）** 都是组件内容分发的核心机制，但两者的实现方式和设计理念有显著差异。以下是详细对比分析：

---

### 一、Vue 3 中的 Slot
Vue 的插槽机制允许父组件向子组件传递**模板片段**，子组件通过 `<slot>` 标签决定这些内容的位置。

#### 1. **基础用法**
```vue
<!-- 子组件 Child.vue -->
<template>
  <div>
    <slot></slot> <!-- 默认插槽 -->
  </div>
</template>

<!-- 父组件 -->
<Child>
  <p>这是插入到子组件的内容</p>
</Child>
```

#### 2. **具名插槽 (Named Slots)**
Vue 3 使用 `v-slot` 指令（简写为 `#`）定义具名插槽：
```vue
<!-- 子组件 Layout.vue -->
<template>
  <div>
    <header><slot name="header"></slot></header>
    <main><slot></slot></main> <!-- 默认插槽 -->
    <footer><slot name="footer"></slot></footer>
  </div>
</template>

<!-- 父组件 -->
<Layout>
  <template #header>
    <h1>标题</h1>
  </template>
  
  <p>默认内容</p>
  
  <template #footer>
    <p>页脚</p>
  </template>
</Layout>
```

#### 3. **作用域插槽 (Scoped Slots)**
子组件可以通过插槽向父组件传递数据：
```vue
<!-- 子组件 List.vue -->
<template>
  <ul>
    <li v-for="item in items">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<!-- 父组件 -->
<List :items="items">
  <template v-slot:default="{ item }">
    <span>{{ item.name }}</span>
  </template>
</List>
```

#### 4. **动态插槽名**
Vue 3 支持动态插槽名：
```vue
<template #[dynamicSlotName]>
  ...
</template>
```

---

### 二、React 中的 Slot 类比
React 没有原生的插槽概念，但可以通过 `props.children` 和 **Render Props** 实现类似功能。

#### 1. **默认插槽：`props.children`**
```jsx
// 子组件 Child.jsx
const Child = ({ children }) => (
  <div>{children}</div>
);

// 父组件
<Child>
  <p>这是插入到子组件的内容</p>
</Child>
```

#### 2. **具名插槽：多 props 传递**
```jsx
// 子组件 Layout.jsx
const Layout = ({ header, children, footer }) => (
  <div>
    <header>{header}</header>
    <main>{children}</main>
    <footer>{footer}</footer>
  </div>
);

// 父组件
<Layout
  header={<h1>标题</h1>}
  footer={<p>页脚</p>}
>
  <p>默认内容</p>
</Layout>
```

#### 3. **作用域插槽：Render Props**
通过函数作为子组件（Function as Child）或 props 传递函数：
```jsx
// 子组件 List.jsx
const List = ({ items, renderItem }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{renderItem(item)}</li>
    ))}
  </ul>
);

// 父组件
<List
  items={items}
  renderItem={(item) => <span>{item.name}</span>}
/>
```

#### 4. **动态内容**
React 的动态性依赖于 JavaScript 表达式：
```jsx
<Layout
  {...dynamicProps}
/>
```

---

### 三、Vue vs React 插槽对比
| **特性**               | **Vue 3**                          | **React**                          |
|------------------------|-------------------------------------|-------------------------------------|
| **语法风格**           | 声明式模板 (`<slot>` + 指令)        | 命令式 JSX（JavaScript 逻辑主导）  |
| **默认插槽**           | `<slot>` + `props.children`         | `props.children`                   |
| **具名插槽**           | `v-slot:name` 或 `#name`            | 通过多个 props 传递                |
| **作用域插槽**         | 子组件向父组件传数据 (`v-slot:name="data"`) | Render Props 或函数作为子组件      |
| **动态插槽名**         | 支持动态插槽名 (`#[dynamicName]`)   | 通过动态 props 名称实现            |
| **编译优化**           | 模板静态分析优化 (编译时优化)       | 依赖虚拟 DOM Diff（运行时优化）    |
| **类型支持 (TypeScript)** | 泛型组件支持较弱                    | 强大的类型推导（函数组件 + TS）    |

---

### 四、设计哲学差异
1. **Vue 的模板驱动**  
   Vue 的插槽是**声明式**的，通过模板语法明确插槽位置和作用域，适合对 HTML 结构有严格控制的场景。作用域插槽的数据传递直观，适合数据驱动型组件（如表单、列表）。

2. **React 的 JavaScript 驱动**  
   React 的插槽本质是**JavaScript 函数调用**，通过组合 `props` 和组件实现灵活性，适合高度动态的 UI 逻辑。Render Props 和 Hooks 的结合可以更自由地处理状态和副作用。

---

### 五、何时选择哪种方式？
• **Vue 3**：  
  适合需要清晰模板结构、作用域数据传递直观的项目，或希望利用编译时优化的场景（如静态内容提升）。

• **React**：  
  适合需要高度动态逻辑、复杂状态管理的项目，或团队偏好 JavaScript/TypeScript 的灵活性。

---

### 六、总结
• **Vue 的插槽**更像“占位符”，父组件填充内容，子组件控制位置和数据流向。  
• **React 的插槽**是“函数参数”，通过 `props` 传递内容或逻辑，子组件决定如何执行。 