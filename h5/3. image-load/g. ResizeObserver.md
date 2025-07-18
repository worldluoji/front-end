# ResizeObserver

## 背景
可以通过 window.resize 监听视口（viewport）变化，然后通过getBoundingClientRect 或者 getComputedStyle 来获取此时我们关心的元素大小，以此判断元素是否发生了变化，但这些 API 会导致 reflow，同时 resize 事件触发频繁，会产生性能问题。

而且ResizeObserver可以方便的监听dom节点的变化，不限于监听视口大小。

---

## 基础示例
```js
const observer = new ResizeObserver(callback);

const targetElement = document.getElementById('target');
observer.observe(targetElement);

function callback(entries, observer) {
  entries.forEach(entry => {
    console.log('目标元素的尺寸发生变化');
    console.log('新的宽度：', entry.contentRect.width);
    console.log('新的高度：', entry.contentRect.height);
  });
}
```

---

## reference
https://juejin.cn/post/7248832185808175141