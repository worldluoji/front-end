# HTMLImageElement.loading
HTMLImageElement的loading属性为一个字符串，它的值会提示 用户代理 告诉浏览器不在可视视口内的图片该如何加载。这样一来，通过推迟图片加载仅让其在需要的时候加载而非页面初始载入时立刻加载，优化了页面的载入。 

<br>

## 语法
```
let imageLoadScheduling = htmlImageElement.loading;
htmlImageElement.loading = eagerOrLazy;
```
loading取值：
- eager: 默认行为， eager 告诉浏览器当处理 <img> 标签时立即加载图片。
- lazy: 告诉用户代理推迟图片加载直到浏览器认为其需要立即加载时才去加载。

<br>

## load 事件时机
load 事件在文档被完整的处理完成时触发。当图片使用eager加载 (默认值) 时，文档中的所有图片都会在 load 事件触发前载入。

当 loading 值设为 lazy 时，图片不再会立即请求，下载，处理的时间内推迟 load 事件触发。

loading 属性值设为 lazy, 在页面初次加载时就在可视视口内的图片，会被立即加载，但它们也不会推迟 load 事件。换句话说，这些图片不会在处理  <img> 元素时立即加载，但仍会作为页面初始加载的一部分而加载。他们不会影响 load 事件。

这表明当 load 触发前，可视区域内懒加载的图片可能不可见。

<br>

## 防止元素在图片懒加载时出现移位
当一个加载被 loading 属性设为 lazy 的图片最后加载时，浏览器会根据 <img> 元素的尺寸和图片自身大小重排文档，更新被图片影响的元素的位置。

<strong>为了防止重排发生，你需要使用 width 和 height 属性明确设置图片大小</strong>。通过这样建立固有长宽比，你防止了元素的移位。取决于实际的加载时间和重排，移位造成的最小的影响可能只是使用户困惑和不适，最坏的影响则是导致用户点错目标。

<br>

## 参考
- https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/loading
- https://caniuse.com/loading-lazy-attr