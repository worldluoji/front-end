# never
在 TypeScript 中，`never` 类型表示**永不存在的值类型**，是最底层的类型（bottom type）。它用于表示永远**不会发生**或**不应该发生**的情况。以下是关键使用场景：

---

### ✅ **`never` 的核心使用场景**

#### 1. **函数永远不返回**（抛出异常或无限循环）
```typescript
// 抛出错误（永不返回）
function crashApp(message: string): never {
    throw new Error(message);
}

// 无限循环（永不返回）
function infiniteLoop(): never {
    while(true) { /* ... */ }
}
```

#### 2. **类型收窄的穷尽检查**（Exhaustiveness Check）
```typescript
type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
        default: 
            // TypeScript 会推断此处的 shape 是 never
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
```
**作用**：当新增 `Triangle` 类型到 `Shape` 时，TS 会提示 `default` 分支错误，强制你处理新类型。

#### 3. **过滤联合类型中的无效值**
```typescript
// 移除 null/undefined
type NonNullable<T> = T extends null | undefined ? never : T;

// 获取函数参数类型
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;
```

#### 4. **表示空数组类型**
```typescript
const emptyArray: never[] = [];
// 任何添加操作都会报错
emptyArray.push("something"); // ❌ 错误：类型 "string" 不能赋给 never
```

---

### 🆚 **`never` vs `void` vs `unknown`**

| **类型** | **含义**                          | **赋值规则**                                | 典型场景                     |
|----------|-----------------------------------|------------------------------------------|------------------------------|
| `never`  | 永不存在的值                      | 不能赋值给任何类型（除自身和`any`）       | 错误处理/穷尽检查            |
| `void`   | 空值（通常是`undefined`）         | 可赋值给`void`/`any`/`unknown`           | 函数无返回值                 |
| `unknown`| 未知类型（需检查）                | 可赋值给`any`/`unknown`，其它需断言       | 动态类型的安全容器           |

---

### 🔑 **关键特性**
1. **底层类型**：所有类型都可以赋给 `never` 的父类型（如 `any`/`unknown`），但 `never` **只能赋给自己**。
   ```typescript
   declare const nev: never;
   const a: string = nev; // ❌ 错误：不能将 never 赋给 string
   ```

2. **联合类型中被忽略**：
   ```typescript
   type T = string | never; // 等价于 string
   ```

3. **交叉类型中被吸收**：
   ```typescript
   type T = string & never; // 等价于 never
   ```

---

### ⚠️ **常见误区**
- **不要手动标注变量为 `never`**：除非用于穷尽检查或空数组等特殊场景。
- **不要将 `never` 作为参数类型**：这会使函数无法调用（无法传递任何值）。
  ```typescript
  function fn(arg: never) {}
  fn(1); // ❌ 错误：类型 "number" 不能赋给 never
  ```

---

### **何时选择 `never` ？**
| **场景**                      | **推荐类型** |
|-------------------------------|-------------|
| 函数永不返回（异常/死循环）    | ✅ `never`   |
| 联合类型的完整性检查          | ✅ `never`   |
| 类型工具中的无效值占位        | ✅ `never`   |
| 函数正常无返回值              | ⛔ `void`     |
| 动态内容容器                  | ⛔ `unknown`  |

通过合理使用 `never`，你可以利用 TypeScript 的类型系统强制处理边界情况，实现更安全的类型设计。