# HTML 常用元素

HTML（超文本标记语言）是构建网页的基础语言。它通过各种标签定义网页的结构和内容。以下是一些常用的 HTML 元素及其功能说明。

---

## 1. 标题元素
标题元素用于定义网页的标题或子标题，通常从 `<h1>` 到 `<h6>` 表示不同的层级。`<h1>` 是最高级别的标题，通常用于主标题；`<h2>` 到 `<h6>` 用于各级子标题。

```html
<!DOCTYPE html>
<html>
   <head><title>我的网站</title></head>
   <body>
      <h1>欢迎来到我的网站</h1>
      <h2>这是副标题</h2>
   </body>
</html>
```

---

## 2. 段落元素
`<p>` 元素用于定义段落，是网页中显示文本内容的主要方式。`p` 是 "paragraph" 的缩写。

```html
<p>这是一个段落。</p>
<p>这是另一个段落。</p>
```

---

## 3. 注释
HTML 注释以 `<!--` 开头，以 `-->` 结尾。注释不会在浏览器中显示，但可以用来为代码添加说明或临时禁用某些内容。

```html
<!-- 这是一个注释 -->
<p>这是一个段落。</p>
```

---

## 4. HTML5 新增语义化标签
HTML5 引入了许多新的语义化标签，这些标签不仅使 HTML 更具描述性，还提高了代码的可读性和搜索引擎优化（SEO）效果。常见的语义化标签包括：
- `<main>`：表示页面的主要内容。
- `<header>`：定义页面或部分内容的头部。
- `<footer>`：定义页面或部分内容的底部。
- `<nav>`：定义导航链接部分。
- `<article>`：表示独立的文章内容。
- `<section>`：表示页面中的一个逻辑区域。

```html
<main>
   <header>
      <h1>网站标题</h1>
   </header>
   <section>
      <h2>文章标题</h2>
      <p>文章内容...</p>
   </section>
   <footer>
      <p>版权所有 © 2023</p>
   </footer>
</main>
```

---

## 5. 内部链接
使用 `<a>` 标签可以创建超链接。通过设置 `href` 属性，可以实现页面内跳转或外部链接。

### 页面内跳转
```html
<a href="#contacts-header">跳转到联系信息</a>
<h2 id="contacts-header">联系信息</h2>
```
点击链接后，页面会跳转到 `id="contacts-header"` 的位置。

### 外部链接
```html
<a href="https://www.example.com" target="_blank">打开新窗口</a>
```
`target="_blank"` 表示在新窗口中打开链接。

### 图片链接
`<a>` 标签还可以嵌套图片，点击图片时跳转到指定链接：
```html
<a href="https://www.example.com">
   <img src="example.jpg" alt="示例图片">
</a>
```

---

## 6. 无序列表
`<ul>` 和 `<li>` 标签用于创建无序列表，列表项前通常显示项目符号（如圆点）。

```html
<ul>
   <li>苹果</li>
   <li>香蕉</li>
   <li>橙子</li>
</ul>
```

---

## 7. 有序列表
`<ol>` 和 `<li>` 标签用于创建有序列表，列表项前显示数字编号。

```html
<ol>
   <li>第一步：准备材料</li>
   <li>第二步：开始操作</li>
   <li>第三步：完成任务</li>
</ol>
```

---

## 8. 表单元素
表单用于收集用户输入，常见的表单元素包括 `<form>`、`<input>`、`<button>` 等。

### 示例：提交猫咪照片
```html
<form action="https://www.freecatphotoapp.com/submit-cat-photo">
   <!-- 单选按钮 -->
   <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked> 室内</label>
   <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> 室外</label><br>

   <!-- 复选框 -->
   <label for="loving"><input id="loving" type="checkbox" name="personality" value="loving" checked> 可爱</label>
   <label for="lazy"><input id="lazy" type="checkbox" name="personality" value="lazy"> 懒惰</label>
   <label for="energetic"><input id="energetic" type="checkbox" name="personality" value="energetic"> 活泼</label><br>

   <!-- 文本输入框 -->
   <input type="text" placeholder="猫咪照片 URL" required>

   <!-- 提交按钮 -->
   <button type="submit">提交</button>
</form>
```

---

## 9. 标签与输入框分离
`<label>` 标签可以通过 `for` 属性与对应的 `<input>` 元素关联，从而提升用户体验和可访问性。

```html
<input id="indoor" type="radio" name="indoor-outdoor">
<label for="indoor">室内</label>
```

---

## 总结
本文介绍了 HTML 中一些常用的元素及其功能，包括标题、段落、注释、语义化标签、链接、列表和表单等。掌握这些基础知识可以帮助你快速构建结构清晰、语义明确的网页。

