# JavaScript编码规范
以下是 Google 和微软在 JavaScript 编码规范方面的主要内容和对比，帮助您快速理解两者的异同和最佳实践：

---

### **Google JavaScript 编码规范**
1. **代码格式**
   - **缩进**：2 个空格，禁用 Tab。
   - **行宽**：不超过 80 字符。
   - **引号**：优先使用单引号 `'`，模板字符串用反引号。
   - **分号**：必须显式添加。

2. **命名规则**
   - **变量/函数**：小驼峰式（`myVariable`）。
   - **常量**：全大写+下划线（`CONSTANT_NAME`）。
   - **类/构造函数**：大驼峰式（`ClassName`）。

3. **ES6+ 最佳实践**
   - 优先使用 `let/const`，避免 `var`。
   - 使用箭头函数替代匿名函数。
   - 优先用模板字符串拼接。

4. **模块化**
   - 使用 ES6 模块语法（`import/export`）。
   - 避免命名空间污染，禁用 `with`。

5. **类型检查**
   - 推荐 TypeScript 或 JSDoc 注释。

6. **错误处理**
   - 禁止忽略 `catch` 中的异常。

7. **工具链**
   - 代码检查：ESLint + Google 配置。
   - 编译工具：Closure Compiler（可选）。

---

### **微软 JavaScript/TypeScript 编码规范**
1. **代码格式**
   - **缩进**：4 个空格（VS Code 默认）。
   - **行宽**：不超过 120 字符。
   - **分号**：可选，但需保持一致。

2. **命名规则**
   - **变量/函数**：小驼峰式（`myVariable`）。
   - **接口**：前缀 `I`（如 `IUser`，TypeScript 中可选）。
   - **类**：大驼峰式（`ClassName`）。

3. **TypeScript 集成**
   - 强制类型声明（避免隐式 `any`）。
   - 优先使用接口而非字面量类型。

4. **异步处理**
   - 优先用 `async/await` 替代 `Promise.then`。

5. **模块化**
   - 使用 ES6 模块或 TypeScript 模块语法。

6. **代码结构**
   - 类成员顺序：字段 > 构造函数 > 方法。
   - 私有成员前缀 `_`（如 `_privateMethod`）。

7. **工具链**
   - 代码检查：ESLint + TypeScript 插件。
   - 编译工具：TypeScript 编译器（`tsc`）。

---

### **关键差异对比**
| **方面**          | **Google**                          | **微软**                          |
|-------------------|-------------------------------------|-----------------------------------|
| **缩进**          | 2 空格                             | 4 空格                            |
| **分号**          | 强制使用                           | 可选，需一致                      |
| **类型系统**      | 可选（JSDoc 或 TypeScript）        | 强制 TypeScript 类型              |
| **异步处理**      | 允许 `Promise` 或 `async/await`    | 优先 `async/await`                |
| **工具链**        | Closure Compiler（可选）           | TypeScript 编译器                 |
| **接口命名**      | 无前缀                             | `I` 前缀（如 `IUser`）            |

---

## 其它规范
### Private syntax
Private fields are based on syntax using a #, both when declaring a field and when accessing it.
```js
class X {
  #foo;
  method() {
    console.log(this.#foo)
  }
}
```

---

### **最佳实践建议**
1. **新项目**：优先采用 TypeScript（微软规范），结合 Google 的格式规则。
2. **代码质量**：统一使用 ESLint + Prettier 自动格式化。
3. **模块化**：ES6 模块为主，避免全局污染。
4. **异步代码**：`async/await` 提高可读性，正确处理错误边界。

建议查阅官方最新文档以获取细节：
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Microsoft TypeScript Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)
- https://github.com/tc39/proposal-class-fields