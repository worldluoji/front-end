## useDeferredValue
startTransition 可以用来标记低优先的 state 更新；
而 useDeferredValue 可以用来标记低优先的变量。

下方代码的具体效果是当 input 的值改变时，返回的 graphValue 并不会立即改变，会首先返回上一次的 input 值，如果当前不存在更紧急的更新，才会变成最新的 input，因此可以通过 graphValue 是否改变来进行一些低优先级的更新。

可以在渲染比较耗时的情况下把优先级滞后，在多数情况不会存在不必要的延迟。在较快的机器上，滞后会更少或者根本不存在，在较慢的机器上，会变得更明显。但不论哪种情况，应用都会保持可响应。

```tsx
import { useDeferredValue } from "react";

const Comp = (input) => {
  const graphValue = useDeferredValue(input); // ...updating depends on graphValue
};
```