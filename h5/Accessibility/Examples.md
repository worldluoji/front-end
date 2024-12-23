# Examples
## 1. native-keyboard-accessibility

这个例子强调了使用正确的语义元素来执行适当任务的重要性。你可以用 CSS 设计任何元素，使其看起来像链接或按钮，并用 JavaScript 让它们的行为类似于链接或按钮，但实际上它们并不是真正的链接或按钮。这样做，你会失去这些元素本身就提供的许多无障碍特性，而且这些特性是免费的。因此，如果可能的话，你应该避免这样做。

另一个建议——正如我们的示例所展示的，你可以使用 :focus 伪类来控制可聚焦元素在聚焦时的样式。最佳实践是将焦点和悬停样式结合使用，这样无论用户是使用鼠标还是键盘，都能通过视觉提示了解控件在激活时的行为。
```css
a:hover,
input:hover,
button:hover,
select:hover,
a:focus,
input:focus,
button:focus,
select:focus {
  font-weight: bold;
}
```

## 2. fake-div-buttons
如果“1”中的情况无法避免，还是使用div来实现了按钮，那么可以给我们的假 `<div>` 按钮添加 tabindex="0" 属性，使它们可以获得焦点（包括通过 tab 键）。

为了通过 Enter/Return 键激活它们，我们必须添加以下 JavaScript 技巧：
```js
document.onkeydown = (e) => {
  if (e.code === "Enter") {
    // Enter/Return 键
    document.activeElement.onclick(e);
  }
};
```
