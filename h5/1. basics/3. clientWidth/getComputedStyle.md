# getComputedStyle
`window.getComputedStyle()` 是 JavaScript 中用于获取元素最终计算样式的核心 API。以下是其关键点解析：

---

### **核心功能**
- **获取元素最终样式**：返回元素应用所有 CSS 规则（包括继承、内联样式、外部样式表等）后的计算值。
- **只读属性**：无法直接修改样式，需通过 `element.style` 操作内联样式。

---

### **语法与参数**
```javascript
const style = window.getComputedStyle(element, pseudoElement);
```
- **`element`**：目标 DOM 元素（必填）。
- **`pseudoElement`**：可选参数，如 `:before` 或 `:after`，用于获取伪元素样式。

---

### **返回值**
- **`CSSStyleDeclaration` 对象**：包含元素所有计算后的 CSS 属性值，例如：
  ```javascript
  const element = document.getElementById("myDiv");
  const style = window.getComputedStyle(element);
  console.log(style.backgroundColor); // 输出计算后的背景色（如 "rgb(255, 0, 0)"）
  ```

---

### **与 `element.style` 的区别**
| 特性                | `getComputedStyle()`               | `element.style`              |
|---------------------|------------------------------------|------------------------------|
| **可读性**          | ✅ 支持                            | ✅ 支持                      |
| **可写性**          | ❌ 只读                            | ✅ 可读写                    |
| **样式来源**        | 所有生效的样式（继承、内联、外部） | 仅内联样式（`style` 属性）   |
| **伪元素支持**      | ✅ 支持（如 `:after`）             | ❌ 不支持                    |

---

### **使用场景**
1. **动态样式调整**  
   根据计算后的样式动态修改元素属性：
   ```javascript
   const element = document.getElementById("myElement");
   const computedStyle = window.getComputedStyle(element);
   element.style.color = computedStyle.backgroundColor; // 将背景色设为文字颜色
   ```

2. **获取伪元素样式**  
   通过第二个参数指定伪元素：
   ```javascript
   const pseudoStyle = window.getComputedStyle(element, ":before");
   console.log(pseudoStyle.content); // 输出伪元素内容（如 "rocks!"）
   ```

3. **兼容性处理**  
   注意属性名的驼峰式写法（如 `fontSize` 而非 `font-size`），以及 `float` 属性的兼容问题（IE 使用 `styleFloat`，其他浏览器用 `cssFloat`）。

---

### **注意事项**
- **不触发重排/重绘**：频繁调用不会影响性能。
- **返回值可能为空**：若元素未加载或不可见，可能返回空对象。
- **IE 兼容性**：IE 9+ 支持，IE 8 需使用 `currentStyle` 属性。

---

### **示例代码**
```javascript
// 获取元素计算后的宽度
const element = document.getElementById("box");
const width = window.getComputedStyle(element).width;
console.log(width); // 输出类似 "100px"

// 获取伪元素内容
const pseudoContent = window.getComputedStyle(element, "::after").content;
console.log(pseudoContent); // 输出伪元素内容（如 "Hello!"）
```

---

通过 `window.getComputedStyle()`，开发者可以精准获取元素的实际样式，适用于响应式设计、动画控制等场景。