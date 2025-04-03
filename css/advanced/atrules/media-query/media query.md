# Media Query
CSS中的媒体查询（Media Query）是一种强大的工具，允许开发者根据设备的特性（如屏幕尺寸、分辨率、方向等）应用不同的样式规则。它是实现响应式设计的核心技术。以下是媒体查询的详细讲解：

---

### **1. 基本语法**
媒体查询使用 `@media` 规则，基本结构为：
```css
@media 媒体类型 and (媒体特性) {
  /* 满足条件时应用的CSS样式 */
}
```
- **媒体类型**（可选）：如 `screen`（屏幕）、`print`（打印）、`all`（所有设备）。
- **媒体特性**：如宽度、高度、方向等，常用 `min-width`、`max-width` 等。

**示例：**
```css
/* 当屏幕宽度≥768px时应用此样式 */
@media screen and (min-width: 768px) {
  .container { width: 750px; }
}
```

---

### **2. 常用媒体特性**
| 特性                  | 说明                                 |
|-----------------------|------------------------------------|
| `width` / `min-width` / `max-width` | 视口宽度（常用）       |
| `height` / `min-height` / `max-height` | 视口高度         |
| `orientation`         | 设备方向：`portrait`（竖屏）或 `landscape`（横屏） |
| `resolution`          | 设备分辨率（如 `min-resolution: 300dpi`） |
| `aspect-ratio`        | 视口宽高比（如 `16/9`）               |
| `prefers-color-scheme`| 系统主题：`light` 或 `dark`（深色模式） |

---

### **3. 逻辑操作符**
- **`and`**：组合多个条件（所有条件需同时满足）。
  ```css
  @media (min-width: 768px) and (max-width: 1024px) { ... }
  ```
- **`,`**（逗号）：表示“或”关系（任一条件满足即可）。
  ```css
  @media (max-width: 600px), (orientation: landscape) { ... }
  ```
- **`not`**：否定整个查询条件。
  ```css
  @media not screen and (min-width: 768px) { ... }
  ```

---

### **4. 常见应用场景**
#### **响应式布局**
```css
/* 移动优先：默认样式（小屏幕） */
.container { width: 100%; }

/* 中等屏幕（平板） */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* 大屏幕（桌面） */
@media (min-width: 992px) {
  .container { width: 970px; }
}
```

#### **打印样式优化**
```css
@media print {
  .navbar, .ads { display: none; }
  body { font-size: 12pt; }
}
```

#### **横屏适配**
```css
@media (orientation: landscape) {
  .banner { height: 300px; }
}
```

#### **高分辨率设备**
```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo { background-image: url("logo@2x.png"); }
}
```

---

### **5. 使用方式**
- **内嵌在CSS文件中**：直接写入样式表。
- **通过`<link>`引入**：指定 `media` 属性加载不同样式文件。
  ```html
  <link rel="stylesheet" media="(max-width: 600px)" href="mobile.css">
  ```

---

### **6. 注意事项**
- **视口设置**：确保移动端正确渲染，需在HTML中添加：
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- **条件顺序**：遵循“移动优先”时，从小到大编写媒体查询；反之则从大到小。
- **避免过度使用**：优先使用弹性布局（Flexbox/Grid）和相对单位（`%`、`vw`、`vh`）。

---

### **7. 浏览器兼容性**
- 现代浏览器全面支持媒体查询。
- 旧版浏览器（如IE9以下）需使用Polyfill（如 [Respond.js](https://github.com/scottjehl/Respond)）。

---

通过灵活运用媒体查询，可以创建适应不同设备的响应式网页，显著提升用户体验。结合现代CSS布局技术（如Flexbox、Grid）和容器查询（未来趋势），能更高效地实现复杂布局。