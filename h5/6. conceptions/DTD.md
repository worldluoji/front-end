# DTD

在 HTML 中，**DTD（Document Type Definition，文档类型定义）** 是一种用于**定义 HTML 文档结构和元素规则**的规范。它决定了浏览器应如何解析和渲染页面，确保网页按照标准模式显示，而不是“怪异模式”（Quirks Mode）。

---

### **DTD 的核心作用**
1. **声明文档类型**  
   通过 `<!DOCTYPE>` 声明，告诉浏览器当前 HTML 文档遵循的版本和规则（如 HTML4、XHTML、HTML5 等）。

2. **规范元素和属性**  
   定义文档中允许使用的标签（如 `<div>`、`<p>`）、属性（如 `class`、`id`）及其嵌套规则（如 `<ul>` 内只能包含 `<li>`）。

3. **触发标准渲染模式**  
   浏览器会根据 DTD 选择正确的渲染模式，避免因历史兼容性问题导致的布局错乱。

---

### **HTML 中的 DTD 声明**
不同版本的 HTML 对应不同的 DTD 声明：

#### 1. **HTML4.01**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```
• **Strict（严格模式）**：禁用废弃标签（如 `<font>`）。
• **Transitional（过渡模式）**：允许部分旧标签。
• **Frameset（框架模式）**：支持 `<frameset>` 框架。

#### 2. **XHTML 1.0**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```
• 基于 XML 语法，标签必须闭合（如 `<br/>`），属性值必须加引号。

#### 3. **HTML5**
```html
<!DOCTYPE html>
```
• HTML5 不再基于 SGML，因此 DTD 声明大幅简化，仅需 `<!DOCTYPE html>` 即可触发标准模式。

---

### **DTD 的底层原理**
1. **SGML/XML 的继承**  
   HTML4 和 XHTML 基于 SGML/XML 标准，DTD 是这些语言中定义文档结构的传统方式。

2. **浏览器渲染模式**  
   • **标准模式（Standards Mode）**：按 W3C 标准渲染。
   • **怪异模式（Quirks Mode）**：模拟旧浏览器行为，用于兼容未声明 DTD 的古老页面。
   • **准标准模式（Almost Standards Mode）**：部分兼容旧规则（如表格布局）。

---

### **为什么 HTML5 不再需要复杂 DTD？**
HTML5 抛弃了基于 SGML 的 DTD，转而通过更简单的 `<!DOCTYPE html>` 声明直接触发标准模式，同时引入新的解析规则（如容错处理），使开发者无需关注复杂的 DTD 细节。

---

### **总结**
| 版本       | DTD 作用                          | 示例声明                     |
|------------|----------------------------------|-----------------------------|
| **HTML4**  | 定义标签规则，区分严格/过渡模式     | `<!DOCTYPE HTML PUBLIC ...>`|
| **XHTML**  | 强制 XML 语法，严格校验标签闭合     | `<!DOCTYPE html PUBLIC ...>`|
| **HTML5**  | 仅触发标准模式，简化开发           | `<!DOCTYPE html>`           |

**核心意义**：DTD 是 HTML 文档的“说明书”，确保浏览器正确解析内容，而 HTML5 的简化设计降低了开发者的使用门槛。