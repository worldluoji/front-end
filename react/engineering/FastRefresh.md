# FastRefresh
有时候会看到eslint给予提示；
```
Fast refresh only works when a file only exports components. Move your component(s) to a separate file
```
这个提示与 React 的 **Fast Refresh（快速刷新）** 机制密切相关，它旨在优化开发体验。当你在开发过程中修改代码时，Fast Refresh 会自动重新加载模块但保持组件的状态。下面我会详细解释其原理和解决方法：

---

### 🔧 **Fast Refresh 工作原理**
1. **增量更新**：
   - 当文件变更时，打包器（Webpack/Vite）会重新编译该模块
   - 但**不刷新整个页面**，只重新执行该模块的代码
   - React 运行时尝试复用已挂载组件的状态（如 `useState` 的值保持不变）

2. **组件识别**：
   - React 会扫描模块的导出项：
   - ✅ 只包含 React 组件或自定义 Hook → **安全更新**
   - ❌ 包含非组件导出（如函数/常量）→ **触发警告**

3. **边界检查**：
   ```javascript
   // 模块文件示例
   export function Component() {} // ✅ 可热更新
   export const config = {}        // ❌ 非组件
   export function utils() {}      // ❌ 非组件
   ```

---

### ⚠️ **为什么混合导出会破坏 Fast Refresh？**
1. **潜在副作用风险**：
   - 非组件导出可能在模块加载时有副作用（如初始化全局变量）
   ```javascript
   export let cache = []; // 修改组件代码可能导致缓存异常

   export function Component() {
     cache.push("data"); // 副作用操作
   }
   ```

2. **状态不一致风险**：
   - 当模块重新执行时：
   - React 组件：保持实例状态（通过特殊 HMR 代理）
   - 非组件变量：会被**重置为初始值**
   ```javascript
   let count = 0; // 每次热更新都被重置为 0

   export function Counter() {
     const [num] = useState(0); // ✅ 状态保留
     count++; // ❌ 变量会被重置
   }
   ```

3. **更新策略冲突**：
   - 组件需要**重新渲染但保持状态**
   - 普通 JS 模块需要**完全重新初始化**

---

### 🛠️ **解决方法**
1. **遵循单一导出原则**：
   ```diff
   // ❌ 错误方式：混合导出
   export function Button() {...}
   export const API_URL = "...";
   
   // ✅ 正确方式：组件单独导出
   // Button.jsx
   export default function Button() {...}
   
   // constants.js
   export const API_URL = "...";
   ```

2. **使用分层结构**：
   ```
   src/
   ├── components/
   │   ├── Button.jsx  // 只包含组件
   ├── utils/
   │   ├── helpers.js  // 非组件代码
   ```

3. **临时绕过方案**：
   ```javascript
   // 禁用本文件 Fast Refresh (不推荐)
   if (import.meta.hot) {
     import.meta.hot.dispose(() => window.location.reload());
   }
   ```

---

### ⚡ **最佳实践**
| **场景**                      | **推荐方案**                     |
|-------------------------------|---------------------------------|
| 纯 UI 组件                    | 单文件导出组件                  |
| 组件+少量类型定义             | 可接受（如 `interface Props`） |
| 组件+工具函数                 | 拆分为两个文件                  |
| 上下文提供器                  | 与消费者组件分离                |
| 自定义 Hook                   | 允许单独导出（Fast Refresh 支持）|

---

### 🌐 **底层实现原理**
当检测到文件变更时，React 的快速刷新运行时：
1. 检查模块是否更新：`module.hot.accept()`
2. 遍历导出项：`for (const exportName in module.exports)`
3. 类型识别：
   ```javascript
   // React Refresh 内部逻辑简化
   if (isReactComponent(exportValue)) {
     registerComponent(exportValue, exportName); // 标记可更新组件
   } else {
     forceFullReload(); // 发现非组件 → 触发警告和完整刷新
   }
   ```

最终保证了：
- 组件更新 → 保留状态（闭包/refs/DOM 状态）
- 非组件更新 → 安全提示开发者拆分文件

遵循这个规则，你将在开发过程中获得丝滑的热更新体验，同时避免状态意外丢失的调试噩梦。