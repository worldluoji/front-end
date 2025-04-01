# Proxy
JavaScript 中的 **Proxy** 是 ES6 引入的一种强大的元编程工具，它可以为对象创建一个“代理”，拦截并自定义对象的基本操作（如属性读写、删除、方法调用等）。Proxy 的设计目标是提供一种更灵活、更全面的对象拦截机制，弥补了传统 `Object.defineProperty` 的局限性。

---

### **Proxy 的核心概念**
1. **代理对象**：通过 `new Proxy(target, handler)` 创建，操作代理对象时，会触发 `handler` 中定义的陷阱函数（traps）。
2. **陷阱函数**：`handler` 对象中定义的方法，例如 `get`、`set`、`has`、`deleteProperty` 等，用于拦截对应操作。
3. **透明性**：代理对象的行为看起来和原对象一致，但内部逻辑可自定义。

```javascript
const target = { name: "Alice" };
const handler = {
  get(target, prop) {
    console.log(`读取属性：${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`设置属性：${prop} 为 ${value}`);
    target[prop] = value;
    return true; // 表示成功
  }
};
const proxy = new Proxy(target, handler);

proxy.name; // 输出 "读取属性：name"
proxy.age = 30; // 输出 "设置属性：age 为 30"
```

---

### **Proxy 对比 Object.defineProperty 的优势**

#### 1. **拦截操作更全面**
• **Proxy** 支持拦截 **13 种操作**，包括：
  • 属性读写（`get`/`set`）
  • 属性删除（`deleteProperty`）
  • 检查属性存在（`has`，对应 `in` 操作符）
  • 遍历键（`ownKeys`，对应 `Object.keys()` 或 `for...in`）
  • 函数调用（`apply`）
  • 构造函数调用（`construct`）
  • 等等。
• **Object.defineProperty** 仅能拦截属性的 `get` 和 `set`，无法处理其他操作。

#### 2. **动态属性支持**
• **Proxy** 自动拦截所有属性（包括动态新增的），无需预先定义。
  ```javascript
  proxy.newProp = 100; // 直接触发 set 陷阱
  ```
• **Object.defineProperty** 需遍历对象属性逐个定义 `get`/`set`，新增属性需重新调用 `defineProperty`。

#### 3. **数组和复杂对象的友好支持**
• **Proxy** 可以直接拦截数组的 `push`、`pop` 等操作，无需重写数组方法。
  ```javascript
  const arrayProxy = new Proxy([], {
    set(target, prop, value) {
      console.log(`修改数组索引 ${prop} 为 ${value}`);
      target[prop] = value;
      return true;
    }
  });
  arrayProxy.push(1); // 触发 set 陷阱（修改索引 0 和 length）
  ```
• **Object.defineProperty** 需手动重写数组方法，或通过特殊逻辑处理 `length` 属性（如 Vue 2 的实现）。

#### 4. **更简洁的 API**
• **Proxy** 只需一次代理即可覆盖所有属性和操作。
• **Object.defineProperty** 需要遍历对象属性，逐个配置描述符。

---

### **适用场景**
1. **响应式系统**（如 Vue 3）：通过 Proxy 自动追踪依赖。
2. **数据校验**：拦截写入操作，验证数据合法性。
3. **日志/调试**：记录对象操作行为。
4. **保护敏感数据**：防止直接访问或修改私有属性。

---

### **总结**
Proxy 提供了更强大的拦截能力、更简洁的 API，尤其适合处理动态属性、数组和复杂对象。而 `Object.defineProperty` 由于设计上的局限性，逐渐被 Proxy 取代，尤其在需要全面拦截的场景下。但 Proxy 的浏览器兼容性需注意（IE 不支持），但在现代前端开发中已广泛使用。