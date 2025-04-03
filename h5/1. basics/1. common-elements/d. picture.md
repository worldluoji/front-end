# picture
```html
<picture>
  <source
    srcset="/shared-assets/images/examples/surfer.jpg"
    media="(orientation: portrait)" />
  <img src="/shared-assets/images/examples/painted-hand.jpg" alt="" />
</picture>
```
浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 src 属性中的 URL。然后，所选图像呈现在`<img>`元素占据的空间中。

---

## 示例
使用 `<picture>` 元素实现桌面端显示 WebP、移动端显示压缩 JPEG 并兼容旧浏览器:
```html
<picture>
  <!-- 桌面端：WebP格式（视口≥768px且支持WebP的浏览器） -->
  <source media="(min-width: 768px)" 
          srcset="images/desktop-image.webp" 
          type="image/webp">
  
  <!-- 桌面端回退：高质量JPEG（视口≥768px但不支持WebP的浏览器） -->
  <source media="(min-width: 768px)" 
          srcset="images/desktop-fallback.jpg" 
          type="image/jpeg">

  <!-- 移动端：压缩JPEG（视口≤767px的所有浏览器） -->
  <source media="(max-width: 767px)" 
          srcset="images/mobile-compressed.jpg" 
          type="image/jpeg">

  <!-- 终极回退方案（旧浏览器/不支持picture的浏览器） -->
  <img src="images/mobile-compressed.jpg" 
       alt="示例图片描述"
       loading="lazy"
       width="1200" 
       height="800">
</picture>
```

---

## reference
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture