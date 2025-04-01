# 什么时候选择redux
在 React 应用中，选择 **Context API** 还是 **Redux** 取决于项目的规模、状态管理需求和团队经验。以下是优先选择 Context API 的典型场景和对比分析：

---

### **一、优先使用 Context API 的场景**

#### **1. 状态简单且更新频率低**
- **场景**：全局主题切换、用户登录状态、多语言等低频更新需求。
- **示例**：
  ```jsx
  // 创建主题 Context
  const ThemeContext = createContext('light');

  function App() {
    const [theme, setTheme] = useState('light');
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  ```

---

#### **2. 避免引入第三方依赖**
- **场景**：中小型项目希望减少依赖项，或已有 Context 能满足需求。
- **优势**：无需安装额外库，直接使用 React 内置能力。

---

#### **3. 状态层级较深但逻辑简单**
- **场景**：需要跨多层组件传递数据（如用户配置、权限信息）。
- **对比**：Context 可替代手动逐层传递 Props（Prop Drilling）。

---

#### **4. 结合 `useReducer` 管理局部复杂状态**
- **场景**：表单状态、购物车等组件树内较复杂的局部状态。
- **示例**：
  ```jsx
  const CartContext = createContext();

  function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  }
  ```

---

### **二、优先选择 Redux 的场景**

#### **1. 高频状态更新**
- **场景**：实时数据仪表盘、股票行情等高频更新需求。
- **优势**：Redux 通过 `selector` 和 `immutable updates` 优化渲染性能。

---

#### **2. 复杂状态逻辑**
- **场景**：跨组件状态依赖、撤销/重做、状态快照（时间旅行调试）。
- **工具支持**：Redux DevTools 提供强大的调试能力。

---

#### **3. 需要中间件支持**
- **场景**：异步请求（Thunk/Saga）、日志记录、错误监控。
- **示例**：
  ```jsx
  // Redux 异步请求中间件（thunk）
  const fetchUser = () => async (dispatch) => {
    dispatch(requestStart());
    try {
      const user = await api.getUser();
      dispatch(requestSuccess(user));
    } catch (err) {
      dispatch(requestFail(err));
    }
  };
  ```

---

#### **4. 大型团队协作**
- **场景**：多人协作的大型项目，需要严格的状态管理规范。
- **优势**：Redux 的单一数据源（Single Source of Truth）和纯函数 reducer 更易维护。

---

### **三、Context API vs Redux 核心差异**

| **维度**         | **Context API**                             | **Redux**                              |
|------------------|--------------------------------------------|----------------------------------------|
| **定位**          | React 内置的组件级状态传递工具               | 独立的状态管理库                        |
| **适用规模**       | 中小型应用                                 | 中大型应用                              |
| **性能优化**       | 无内置优化，频繁更新可能引发全子树渲染       | 通过 `selector` 和浅比较避免不必要渲染  |
| **中间件**         | 不支持                                     | 支持（Thunk/Saga/Observable 等）        |
| **调试工具**       | 无专用工具                                 | Redux DevTools（时间旅行、状态追踪）     |
| **学习成本**       | 低（仅需掌握 React 知识）                   | 中高（需理解 Action/Reducer/Store 等概念）|

---

### **四、决策流程图**

```
                         开始
                           ↓
                 是否需要全局状态管理？
                   ↓是                ↓否
          状态更新是否高频或复杂？     使用组件状态（useState/useReducer）
         ↓是                ↓否
       使用 Redux        使用 Context API
```

---

### **五、最佳实践建议**
1. **先用 Context API 验证可行性**：中小型项目初期优先尝试 Context + `useReducer`。
2. **按需渐进升级**：若 Context 无法满足性能或复杂度要求，再迁移到 Redux。
3. **混合使用**：在大型项目中，可用 Context 管理局部状态，Redux 管理全局核心状态。

---

### **示例：混合使用 Context 和 Redux**
```jsx
// 用 Redux 管理核心业务数据（如订单）
const store = configureStore({
  reducer: orderReducer
});

// 用 Context 管理 UI 状态（如弹窗控制）
const ModalContext = createContext();

function App() {
  return (
    <Provider store={store}>
      <ModalContext.Provider value={modalState}>
        <MainLayout />
      </ModalContext.Provider>
    </Provider>
  );
}
```

---

### **总结**
选择 **Context API** 的场景可以概括为：**轻量、低频、简单**。  
选择 **Redux** 的场景则是：**高频、复杂、协作**。  
根据项目阶段和需求灵活选择，避免过度设计或性能妥协。