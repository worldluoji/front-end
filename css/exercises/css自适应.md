# CSS自适应
前端页面自适应（响应式设计）的核心目标是让页面在不同尺寸的设备上都能提供良好的用户体验。以下是完整的自适应方案：

## 一、基础设置

### 1. 视口配置
```html
<!-- 必须添加 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 2. CSS Reset
```css
/* 推荐使用现代CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}
```

## 二、核心响应式技术

### 1. 媒体查询（Media Queries）
```css
/* 移动优先策略 */
/* 默认移动端样式 */

/* 平板 */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* 桌面 */
@media (min-width: 992px) {
  .container { max-width: 960px; }
}

/* 大桌面 */
@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
```

### 2. 相对单位
```css
/* 推荐使用 */
.element {
  /* 相对于根元素 */
  width: 10rem;   /* 160px (16px * 10) */
  
  /* 相对于父元素 */
  width: 50%;     /* 父元素宽度的50% */
  padding: 2em;   /* 2倍字体大小 */
  
  /* 相对于视口 */
  width: 50vw;    /* 视口宽度的50% */
  height: 100vh;  /* 视口高度的100% */
  font-size: 2vw; /* 视口宽度的2% */
}
```

### 3. 弹性布局
```css
/* Flexbox */
.container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 1rem;
}

.item {
  flex: 1 1 300px; /* 基础300px，可伸缩 */
  min-width: 250px; /* 最小宽度 */
}
```

### 4. CSS Grid
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## 三、图片和媒体自适应

### 1. 图片处理
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

### 2. 响应式图片
```html
<!-- 不同分辨率提供不同图片 -->
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 400w, 
          image-medium.jpg 800w, 
          image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="响应式图片示例"
>

<!-- 艺术方向 -->
<picture>
  <source media="(min-width: 768px)" srcset="desktop.jpg">
  <source media="(max-width: 767px)" srcset="mobile.jpg">
  <img src="default.jpg" alt="描述">
</picture>
```

## 四、响应式字体

### 1. 流体排版
```css
html {
  font-size: 16px;
}

@media (min-width: 320px) {
  html { font-size: calc(16px + 4 * ((100vw - 320px) / 680)); }
}

@media (min-width: 1000px) {
  html { font-size: 20px; }
}
```

### 2. clamp函数
```css
/* 最小值 | 理想值 | 最大值 */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: clamp(1.2, 1.5, 2);
}
```

## 五、实用工具类

### 1. 断点管理
```css
/* 定义断点变量 */
:root {
  --mobile: 375px;
  --tablet: 768px;
  --desktop: 1024px;
  --widescreen: 1440px;
}
```

### 2. 显示/隐藏控制
```css
.mobile-only { display: block; }
.desktop-only { display: none; }

@media (min-width: 768px) {
  .mobile-only { display: none; }
  .desktop-only { display: block; }
}
```

## 六、移动端优化

### 1. 触摸友好
```css
button, a {
  min-height: 44px;    /* 最小触摸区域 */
  min-width: 44px;
  padding: 12px 16px;  /* 足够的点击区域 */
}
```

### 2. 防止文字过小
```css
input, textarea, select {
  font-size: 16px;     /* 防止iOS缩放 */
}
```

## 七、现代方案

### 1. Container Queries
```css
@container (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### 2. CSS逻辑属性
```css
/* 支持RTL布局 */
.element {
  margin-inline-start: 1rem;  /* 替换margin-left */
  padding-block-end: 1rem;    /* 替换padding-bottom */
}
```

## 八、框架/库支持

### 1. 主流框架方案
- **Bootstrap**: 12列栅格系统，移动优先
- **Tailwind CSS**: 实用优先，响应式工具类
- **Element Plus / Ant Design**: 组件库内置响应式

### 2. 实用工具类示例
```html
<!-- Tailwind CSS示例 -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="p-4 bg-gray-100">内容1</div>
    <div class="p-4 bg-gray-100">内容2</div>
    <div class="p-4 bg-gray-100">内容3</div>
  </div>
</div>
```

## 九、最佳实践

1. **移动优先设计**：从小屏幕开始，逐步增强
2. **渐进增强**：确保基本功能在所有设备上可用
3. **性能考虑**：
   ```javascript
   // 图片懒加载
   <img loading="lazy" src="image.jpg">
   
   // 条件加载资源
   if (window.innerWidth > 768) {
     // 加载桌面端专用资源
   }
   ```

4. **测试策略**：
   - 实际设备测试
   - Chrome DevTools设备模拟
   - 跨浏览器测试

5. **无障碍支持**：
   - 确保可缩放
   - 键盘导航友好
   - 足够的对比度

## 十、调试技巧

```javascript
// 实时查看视口尺寸
window.addEventListener('resize', () => {
  console.log(`视口: ${window.innerWidth} x ${window.innerHeight}`);
  console.log(`DPR: ${window.devicePixelRatio}`);
});
```

## 总结建议

1. **简单项目**：媒体查询 + Flexbox/Grid
2. **复杂项目**：CSS框架 + 自定义媒体查询
3. **现代项目**：Container Queries + CSS逻辑属性
4. **性能敏感**：条件加载 + 图片优化

选择方案时需考虑项目复杂度、团队熟悉度、浏览器兼容性要求等因素。建议从移动优先开始，逐步增强大屏幕体验。