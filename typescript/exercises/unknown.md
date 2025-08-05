# unknown
在 TypeScript 中，`unknown` 类型用于表示**值类型未知但要求类型安全**的场景。与 `any` 不同，它对操作有严格的限制，必须在执行操作前显式进行类型检查或断言。以下是关键使用场景：

---

### ✅ **适用场景**
1. **替代 `any` 确保类型安全**  
   当值类型不确定时（如解析 JSON），用 `unknown` 强制后续类型检查：
   ```typescript
   function parseJSON(json: string): unknown {
     return JSON.parse(json); // 返回类型不确定
   }
   
   const data = parseJSON('{"name": "Alice"}');
   if (data && typeof data === "object" && "name" in data) {
     console.log(data.name); // ✅ 通过类型检查
   }
   ```

2. **函数参数接受任意类型**  
   要求调用者明确类型后再操作：
   ```typescript
   function safeOperation(value: unknown) {
     if (typeof value === "string") {
       console.log(value.toUpperCase()); // ✅
     }
     // value.toFixed(2); ❌ 错误：未类型检查
   }
   ```

3. **错误处理（TypeScript 4.4+）**  
   `catch` 子句默认用 `unknown` 强制错误类型检查：
   ```typescript
   try { /* ... */ }
   catch (e: unknown) {
     if (e instanceof Error) {
       console.log(e.message); // ✅
     }
   }
   ```

4. **泛型约束表示未知类型**  
   在泛型中声明未知返回类型：
   ```typescript
   type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
   // 使用 infer R 可兼容 unknown 返回值
   ```

---

### ⚠️ **与 `any` 的区别**
| **对比**        | `unknown`                            | `any`                     |
|------------------|--------------------------------------|---------------------------|
| **赋值**         | 只能赋给 `unknown`/`any`             | 可赋给任意类型            |
| **操作**         | 禁止直接操作（需先类型检查）          | 允许任意操作（无检查）    |
| **类型安全**     | ✅ 强制安全                          | ❌ 不安全                 |

---

### ❌ **避免使用的情况**
- **已知类型时**：直接使用具体类型（如 `string`）。
- **无需安全的动态类型**：仅在快速原型阶段考虑 `any`（不推荐）。

---

### **最佳实践总结**
- **默认选择 `unknown` 替代 `any`**：当类型不确定但需安全操作时。
- **操作前必须缩小类型**：使用 `typeof`、`instanceof`、类型守卫或类型断言。
- **优先使用类型守卫**：比类型断言（`as`）更安全。

通过使用 `unknown`，你能在保留灵活性的同时，显著提升代码的类型安全性。