### TypeScript 全方位提升习题集  
以下题目涵盖基础概念、原理分析、编码实战及高级特性，结合类型系统、编译机制和工程化思维，助你全面提升 TypeScript 能力。  

---

### **一、基础概念题**  
1. **类型系统**  
   • **题目**：TypeScript 的静态类型与 JavaScript 的动态类型有何本质区别？举例说明静态类型如何避免运行时错误。  
   • **示例**：  
     ```typescript  
     function add(a: number, b: number): number { return a + b; }  
     add(1, "2"); // 编译时报错：参数类型不匹配  
     ```

2. **接口与类型别名**  
   • **题目**：`interface` 和 `type` 均可定义对象类型，它们的核心差异是什么？何时应优先使用 `interface`？  

3. **类型断言与类型守卫**  
   • **题目**：解释 `as` 关键字和类型守卫（如 `typeof`）的应用场景，并编写一个类型守卫函数处理联合类型。  

---

### **二、原理分析题**  
1. **编译流程**  
   • **题目**：简述 TypeScript 从源码到 JavaScript 的编译过程，并解释 AST（抽象语法树）在其中的作用。  

2. **类型推断机制**  
   • **题目**：以下代码中 `x` 的类型如何推断？解释上下文类型（Contextual Typing）的应用。  
     ```typescript  
     const arr = [1, "2", null];  
     arr.forEach(x => console.log(x));  
     ```  

---

### **三、编码实战题**  
1. **泛型与函数**  
   • **题目**：实现一个泛型函数 `filterByKey`，过滤对象数组中指定键存在的元素。  
   • **要求**：  
     ```typescript  
     // 示例输入：filterByKey([{id:1}, {name:"a"}], "id") → 输出 [{id:1}]  
     ```

2. **树结构处理**  
   • **题目**：编写递归函数 `mapTree`，对二叉树所有节点的值进行映射，返回新树。  
   • **代码框架**：  
     ```typescript  
     type Tree = { value: number; left?: Tree; right?: Tree };  
     function mapTree(root: Tree, fn: (v: number) => number): Tree { /* 实现 */ }  
     ```  

---

### **四、高级特性题**  
1. **条件类型与映射类型**  
   • **题目**：用条件类型 `Exclude<T, U>` 实现一个工具类型 `OptionalProps<T>`，将 `T` 的所有属性变为可选。  

2. **装饰器与元编程**  
   • **题目**：实现一个类装饰器 `@LogMethod`，在调用类方法时打印日志。  

---

### **五、综合设计题**  
**题目**：设计一个类型安全的 `EventEmitter` 类，支持事件订阅与触发，要求：  
• 使用泛型约束事件名与回调参数类型。  
• 提供 `on`、`off`、`emit` 方法。  
• 避免事件名拼写错误（用字面量联合类型）。  

**代码框架**：  
```typescript  
type EventMap = {  
  click: [x: number, y: number];  
  input: [text: string];  
};  

class EventEmitter<T extends Record<string, any[]>> {  
  // 实现逻辑  
}  
```  

---

### **答案解析与提升建议**  
1. **结合编译原理**：深入理解 AST 和类型检查流程，优化复杂类型设计。  
2. **类型体操训练**：通过工具类型（如 `Partial`、`Pick`）掌握映射类型和条件类型。  
3. **工程化实践**：在编码题中融入模块化、错误边界处理，提升实战能力。  

通过系统性练习以上题目，可全面掌握 TypeScript 的核心概念与高级特性，提升类型安全设计与工程化编码能力。