# Vue JSX
Vue 的 JSX 转换方式与 React 中 JSX 的转换方式不同，因此你不能在 Vue 应用中使用 React 的 JSX 转换。与 React JSX 语法的一些明显区别包括：
- 可以使用 HTML attributes 比如 class 和 for 作为 props - 不需要使用 className 或 htmlFor。
- 传递子元素给组件 (比如 slots) 的方式不同。
- Vue JSX中可以使用v-if、v-for等指令，而React中则不行。

当使用 TSX 语法时，确保在 tsconfig.json 中配置了 "jsx": "preserve"，这样的 TypeScript 就能保证 Vue JSX 语法转换过程中的完整性。

## 使用JSX实现插槽功能
```jsx
import { defineComponent, withModifiers } from 'vue';

const Parent = defineComponent({
  setup(_, { slots }) {
    return () => <div>{slots.default && slots.default()}</div>;
  },
});

export default Parent;
```

## reference
https://cn.vuejs.org/guide/extras/render-function.html#JSX%20/%20TSX