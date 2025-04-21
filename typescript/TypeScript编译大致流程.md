# TypeScript编译大致流程
TypeScript 的编译过程是将 TypeScript 代码转换为 JavaScript 代码的关键流程，主要分为以下几个阶段：

---

### **1. 解析（Parsing）**
• **词法分析**：将源代码拆分为一系列**标记（Tokens）**，如关键字、标识符、运算符等。
  ```typescript
  // 示例代码：const x = 10;
  // 标记：["const", "x", "=", "10", ";"]
  ```
• **语法分析**：根据标记构建**抽象语法树（AST）**，表示代码的层级结构。
  ```json
  // AST 片段示例：
  {
    "type": "VariableDeclaration",
    "declarations": [{
      "type": "VariableDeclarator",
      "id": { "type": "Identifier", "name": "x" },
      "init": { "type": "Literal", "value": 10 }
    }]
  }
  ```

---

### **2. 绑定（Binding）**
• **符号关联**：将代码中的标识符（如变量、函数名）与其声明绑定，建立作用域链。
  ```typescript
  function foo() { 
    const x = 1; 
    console.log(x); // 绑定到上一行的 x
  }
  ```

---

### **3. 类型检查（Type Checking）**
• **静态类型验证**：基于 AST 和符号信息，检查类型是否一致。
  ```typescript
  let num: number = "hello"; // 错误：不能将 string 赋给 number
  ```
• **上下文类型推断**：根据上下文自动推断变量类型。
  ```typescript
  const arr = [1, "2", null]; 
  arr.forEach(x => console.log(x)); // x 推断为 number | string | null
  ```

---

### **4. 转换与发射（Transformation & Emit）**
• **语法降级**：将 TypeScript 语法（如 `enum`、装饰器）和高级 JS 语法（如箭头函数）转换为目标版本（如 ES5）。
  ```typescript
  // TypeScript 源码
  const greet = (name: string) => `Hello ${name}`;

  // 转换为 ES5
  var greet = function (name) { return "Hello ".concat(name); };
  ```
• **类型擦除**：移除所有类型注解和 TypeScript 特有语法，生成纯 JavaScript。
  ```typescript
  // 输入（TypeScript）
  let x: number = 10;

  // 输出（JavaScript）
  let x = 10;
  ```
• **生成产物**：输出 `.js` 文件，可能附带 `.d.ts` 声明文件和 Source Maps。

---

### **5. 配置与优化**
• **编译选项**：通过 `tsconfig.json` 控制目标版本（`target`）、模块系统（`module`）、严格模式（`strict`）等。
  ```json
  {
    "compilerOptions": {
      "target": "ES5",
      "module": "CommonJS",
      "strict": true
    }
  }
  ```
• **错误处理**：根据 `noEmitOnError` 决定是否在报错时终止生成代码。

---

### **总结**
TypeScript 的编译流程可概括为：  
**源码 → 解析为 AST → 符号绑定 → 类型检查 → 转换为 JavaScript → 输出文件**。  
这一过程确保了类型安全的静态验证，同时保持与 JavaScript 的兼容性，是现代前端工程化的核心环节。