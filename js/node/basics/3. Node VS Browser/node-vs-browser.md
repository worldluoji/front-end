# Node VS Browser
以下是 Node.js 与浏览器事件循环的核心差异总结：

---

### **1. 基础架构差异**
| 特性                | Node.js                          | 浏览器                     |
|---------------------|----------------------------------|---------------------------|
| **底层实现**         | 基于 `libuv` 库（C++ 实现）      | 浏览器内核（如 Chromium） |
| **线程模型**         | 多线程（但 JS 主线程单线程）     | 单线程（主线程 + 渲染线程等） |
| **核心设计目标**     | 高性能 I/O 操作（服务器场景）    | 用户交互与页面渲染          |

---

### **2. 事件循环阶段划分**
| Node.js 阶段（按执行顺序） | 浏览器阶段（简化版）        |
|---------------------------|---------------------------|
| 1. `timers`（`setTimeout`/`setInterval`） | - 执行宏任务队列           |
| 2. `pending callbacks`（系统操作）       | - 执行微任务队列           |
| 3. `idle, prepare`（内部使用）           | - 渲染页面（如 `requestAnimationFrame`） |
| 4. `poll`（等待 I/O 事件）              | - 用户输入事件             |
| 5. `check`（`setImmediate`）            |                           |
| 6. `close callbacks`（`socket.close()`）|                           |

- **Node.js** 的阶段更明确且可干预，而浏览器的事件循环对开发者透明度更高。

---

### **3. 微任务（Microtask）优先级**
- **Node.js**：
  1. `process.nextTick()`（最高优先级，甚至高于普通微任务）
  2. `Promise.then`/`async/await`
  3. 其他微任务（如 `queueMicrotask`）
- **浏览器**：
  - 所有微任务（如 `Promise.then`）优先级相同，均高于宏任务。

**示例对比**：
```javascript
// 在 Node.js 中：
process.nextTick(() => console.log('Node Micro 1'));
Promise.resolve().then(() => console.log('Node Micro 2'));

// 输出顺序：Node Micro 1 → Node Micro 2

// 在浏览器中：
Promise.resolve().then(() => console.log('Browser Micro 1'));
queueMicrotask(() => console.log('Browser Micro 2'));

// 输出顺序：Browser Micro 1 → Browser Micro 2
```

---

### **4. 特有 API 差异**
| Node.js 特有 API       | 浏览器特有 API               |
|------------------------|-----------------------------|
| `process.nextTick()`   | `requestAnimationFrame()`   |
| `setImmediate()`       | `requestIdleCallback()`     |
| `fs.readFile()`（文件 I/O） | `DOM 操作`（如 `element.addEventListener()`） |

- **Node.js** 的 `setImmediate()` 会在 `timers` 阶段后立即执行，而浏览器需通过 `setTimeout(fn, 0)` 模拟类似行为。
- 浏览器的 `requestAnimationFrame()` 专为动画优化，Node.js 无此特性。

---

### **5. DOM 操作与渲染**
- **浏览器**：
  - DOM 操作独立于 JS 事件循环（在 [render](file:///Users/luke-surface-mac/code/front-end/vue/vue-cdn-demo/public/static/js/vue.js#L7643-L7643) 阶段执行）。
  - 需注意 `requestAnimationFrame` 的使用时机（如动画逻辑应在该阶段执行）。
- **Node.js**：
  - 无 DOM，所有操作基于 I/O 和网络请求。
  - 无需关心页面渲染，但需关注事件循环阻塞对 I/O 吞吐量的影响。

---

### **6. 事件循环终止条件**
- **Node.js**：
  - 事件循环会持续运行直到没有待处理的事件（如 TCP 连接、定时器等）。
  - 可通过 `process.exit()` 强制退出。
- **浏览器**：
  - 事件循环依附于页面生命周期，页面关闭时自动终止。
  - 无法主动控制事件循环终止。

---

### **7. 典型场景差异**
| 场景                  | Node.js 实践                | 浏览器实践                  |
|-----------------------|----------------------------|---------------------------|
| **长时间任务**         | 使用 `setImmediate` 分块处理 | 使用 `Web Worker` 或 `requestIdleCallback` |
| **动画与渲染**         | 不适用（无 DOM）            | 使用 `requestAnimationFrame` |
| **I/O 密集型任务**     | 适合 Node.js（如文件读写）   | 浏览器受限于安全策略（需异步） |

---

### **8. 兼容性建议**
- **跨平台代码**：
  - 避免依赖 `process.nextTick()` 或 `setImmediate()`，改用 `Promise.then()`。
  - 动画逻辑使用 `requestAnimationFrame()`，而非 `setTimeout()`。
- **环境检测**：
  ```javascript
  const isNode = typeof process !== 'undefined' && process.versions?.node;
  ```
