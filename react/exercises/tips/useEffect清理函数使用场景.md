# useEffect清理函数使用场景
在使用 `useEffect` 实现组件挂载时获取数据时，**清理数据（资源回收）是防止内存泄漏和意外行为的关键**。以下是需要清理的典型场景和实现方法：

---

### **一、必须清理的 3 种场景**

#### **1. 异步请求未完成时组件卸载**
• **风险**：如果组件卸载后异步请求完成，尝试更新已卸载组件的状态会导致 `Can't perform a React state update on an unmounted component` 警告或内存泄漏。
• **解决方案**：在清理函数中取消请求。

```jsx
useEffect(() => {
  const controller = new AbortController(); // 创建 AbortController
  const { signal } = controller;

  // 发起请求时传入 signal
  fetch('/api/data', { signal })
    .then(response => response.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error('请求错误:', err);
      }
    });

  // 清理函数：取消未完成的请求
  return () => controller.abort();
}, []);
```

---

#### **2. 定时器（setInterval/setTimeout）未关闭**
• **风险**：组件卸载后定时器仍在执行，持续占用资源。
• **解决方案**：在清理函数中清除定时器。

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('定时器运行中');
  }, 1000);

  // 清理函数：清除定时器
  return () => clearInterval(timer);
}, []);
```

---

#### **3. 订阅事件或外部系统（WebSocket、DOM 事件等）**
• **风险**：组件卸载后仍监听事件，导致内存泄漏或无效回调。
• **解决方案**：在清理函数中取消订阅。

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log('窗口尺寸变化');
  };

  window.addEventListener('resize', handleResize);

  // 清理函数：移除事件监听
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

### **二、无需清理的场景**
1. **同步操作**：如直接操作 DOM 或同步状态更新。
2. **无副作用的静态数据获取**：例如从本地缓存读取数据且无需取消。
3. **已完成的异步请求**：请求在组件卸载前已完成（但通常难以保证）。

---

### **三、通用清理模式**
无论何种副作用，清理函数都应遵循以下模式：
```jsx
useEffect(() => {
  // 1. 初始化操作（请求、订阅、定时器等）
  const resource = createResource();

  // 2. 返回清理函数
  return () => {
    // 销毁操作（取消请求、关闭连接、清除定时器等）
    destroyResource(resource);
  };
}, [dependencies]);
```

---

### **四、特殊场景处理**

#### **1. 使用 Axios 取消请求**
```jsx
useEffect(() => {
  const source = axios.CancelToken.source();

  axios.get('/api/data', {
    cancelToken: source.token
  }).then(response => {
    setData(response.data);
  });

  // 清理函数：取消请求
  return () => source.cancel('组件卸载，取消请求');
}, []);
```

#### **2. 异步函数（async/await）的清理**
需结合 `AbortController`：
```jsx
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      setData(await response.json());
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);
```

---

### **五、为什么 React 要求清理副作用？**
1. **避免内存泄漏**：防止组件卸载后仍占用资源。
2. **保证一致性**：防止更新已销毁组件的状态。
3. **性能优化**：及时释放不再需要的资源。

---

### **最佳实践总结**
| 场景                 | 清理方式                   |
|----------------------|--------------------------|
| 异步请求（fetch）     | `AbortController.abort()` |
| 定时器               | `clearInterval/clearTimeout` |
| 事件监听             | `removeEventListener`     |
| WebSocket/订阅       | `close()` 或取消订阅       |
| 第三方库资源（如 D3）| 调用库提供的销毁方法        |

---

**关键原则**：  
**只要副作用可能产生持续影响（如异步操作、订阅、定时器等），就必须在清理函数中销毁资源**。这是编写可靠 React 组件的核心要求。