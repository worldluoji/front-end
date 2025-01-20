# forwardRef
在React中，`forwardRef` 是一个高阶函数，它用于将 ref 显式地传递给子组件中的DOM元素或类组件。通常情况下，ref是私有的，并且不会从父组件直接传递到子组件的DOM节点上，除非你明确使用`forwardRef`来实现这一点。

以下是 `forwardRef` 的几个主要用途：

1. **访问子组件中的DOM节点**：有时你需要直接操作子组件中的DOM节点，比如聚焦输入框、触发视频播放等。通过`forwardRef`，你可以将ref从父组件传递给子组件，进而获取到具体的DOM节点。

2. **自定义组件包装原始DOM组件**：当你创建了一个更高阶的组件（HOC）或者使用了其他形式的组合时，如果这个新组件需要暴露其内部的DOM节点或类组件实例给父组件，那么就可以用`forwardRef`来实现。

3. **与第三方库集成**：当与其他库结合使用时，这些库可能期望接收一个ref以控制底层元素的行为。此时`forwardRef`可以帮助你在不影响原有API的情况下完成集成。

4. **提高代码复用性和封装性**：通过转发ref，可以让组件更加灵活和可复用，同时保持良好的封装，避免破坏现有的组件结构。

下面是使用 `forwardRef` 的简单示例：

```jsx
import React, { useRef, forwardRef } from 'react';

// 定义一个接受ref的子组件
const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

function App() {
  const buttonRef = useRef();

  return (
    <div>
      {/* 使用带有forwardRef的子组件 */}
      <FancyButton ref={buttonRef}>Click me!</FancyButton>
      <button onClick={() => buttonRef.current.focus()}>
        Focus the button
      </button>
    </div>
  );
}

export default App;
```

在这个例子中，`FancyButton` 组件使用了 `forwardRef` 来接收来自父组件 (`App`) 的 `ref`，并且将其应用于内部的 `<button>` 元素。这样，父组件就可以通过 `buttonRef` 直接访问并操作子组件内的按钮元素了。

记住，在React中直接操作DOM应当谨慎使用，尽可能优先考虑通过状态管理和事件处理来构建交互逻辑。不过，对于某些特定场景，如上述提到的情况，`forwardRef` 提供了一种有用的解决方案。