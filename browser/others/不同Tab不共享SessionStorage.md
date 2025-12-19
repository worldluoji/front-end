**SessionStorage 在不同标签页之间是不共享的**，即使域名和端口完全相同。

## SessionStorage 的特性：

### 1. **标签页隔离性**
- 每个标签页/窗口都有自己独立的 SessionStorage
- 即使打开相同的 URL，不同标签页的 SessionStorage 也是完全隔离的
- 关闭标签页时，该标签页的 SessionStorage 会被清除

### 2. **生命周期**
- 只在当前标签页生命周期内有效
- 刷新页面会保留 SessionStorage
- 关闭标签页后数据被清除

## 对比表

| 特性 | LocalStorage | SessionStorage |
|------|-------------|---------------|
| 跨标签页共享 | ✅ 相同域名下共享 | ❌ 每个标签页独立 |
| 生命周期 | 永久（除非手动清除） | 标签页会话期间 |
| 存储容量 | 通常 5-10MB | 通常 5-10MB |
| 数据共享 | 所有同源窗口共享 | 仅当前窗口可用 |

## 示例验证

```javascript
// 在标签页A设置sessionStorage
sessionStorage.setItem('key', 'value from tab A');

// 在标签页B（相同域名）无法获取
console.log(sessionStorage.getItem('key')); // null
```

## 特殊情况
- 通过 `window.open()` 或点击链接打开的新标签页，**有时**可能会继承源标签页的 SessionStorage（浏览器实现差异）
- 通过 `window.open()` 并且设置了 `rel="opener"` 时，某些浏览器会共享 SessionStorage
- 但通常建议不要依赖这种不可靠的行为

## 实际应用建议
```javascript
// 如果需要在标签页间通信，可以使用：
// 1. LocalStorage（适合长期存储）
localStorage.setItem('sharedData', JSON.stringify(data));

// 2. BroadcastChannel API（现代浏览器）
const channel = new BroadcastChannel('my_channel');
channel.postMessage({ type: 'data', payload: data });

// 3. localStorage事件监听
window.addEventListener('storage', (e) => {
  if (e.key === 'sharedData') {
    console.log('数据已更新:', e.newValue);
  }
});
```

**总结**：SessionStorage 设计初衷就是为单个会话（标签页）提供临时存储，跨标签页数据共享应使用 LocalStorage 或其他通信机制。