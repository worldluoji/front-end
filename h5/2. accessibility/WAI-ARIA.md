# WAI-ARIA
WAI-ARIA 是 W3C 编写的规范，定义了一组可用于其他元素的 HTML 特性，用于提供额外的语义化以及改善缺乏的无障碍

## aria-live
`aria-live` 是一个全局的 ARIA（Accessible Rich Internet Applications）属性，用于标识一个元素是一个“实时区域”（live region），即这个元素的内容可能会动态更新。当这些更新发生时，辅助技术（如屏幕阅读器）会根据 `aria-live` 属性的值来决定是否以及如何向用户通知这些变化。

### `aria-live` 的值

`aria-live` 属性可以接受以下三个值之一：

- **`off`**：这是默认值，表示不会自动将任何更新传达给用户。即使内容发生变化，也不会触发辅助技术的通知。
- **`polite`**：表示在合适的时候通知用户，但不会打断用户的当前活动。例如，如果用户正在阅读一段文本，屏幕阅读器会在用户完成当前任务后再宣布更新。
- **`assertive`**：表示应立即通知用户，甚至可能中断用户的当前活动。这通常用于重要信息或需要用户立即注意的情况。

### 使用场景

- **状态消息**：例如，表单验证消息、加载进度等，应该使用 `polite`，因为它们不是紧急信息，不需要立刻打断用户的操作。
- **警报和错误**：对于重要的系统消息或错误提示，使用 `assertive` 可以确保用户能够立即注意到这些信息。

### 示例代码

下面是一些使用 `aria-live` 属性的例子：

```html
<!-- 一个礼貌的通知 -->
<div id="status" aria-live="polite"></div>

<script>
  // 更新状态消息
  document.getElementById('status').textContent = 'Your form has been submitted successfully.';
</script>

<!-- 一个断言式的警报 -->
<div id="alert" aria-live="assertive"></div>

<script>
  // 发出紧急警告
  document.getElementById('alert').textContent = 'Error: Your session is about to expire!';
</script>
```

### 最佳实践

- **避免过度使用 `assertive`**：只在真正必要的时候使用 `assertive`，因为它会中断用户的当前体验。大多数情况下，`polite` 应该足够了。
- **结合其他 ARIA 属性**：为了提供更精确的信息，你可以与 `aria-atomic`, `aria-relevant`, 和 `aria-busy` 等属性一起使用 `aria-live`。例如，`aria-atomic="true"` 表示整个实时区域的内容应当作为一个整体被读出，而不是逐个更新的部分。

通过正确地使用 `aria-live` 属性，开发者可以帮助确保他们的Web应用对所有用户都是可访问的，包括那些依赖于辅助技术的用户。

## demos
[ARIA-demo1](./examples/aria-live.html)

## reference
https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility/WAI-ARIA_basics