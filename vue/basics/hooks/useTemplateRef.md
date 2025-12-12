# useTemplateRef
`useTemplateRef` 是 Vue 3.5 中引入的一个新的组合式 API，它主要解决了**在模板中更简洁、类型安全地获取子组件实例和 DOM 元素引用**的问题。

## 解决的问题：

### 1. **简化模板引用语法**
以前在 `<script setup>` 中使用模板引用：
```vue
<template>
  <ChildComponent ref="childRef" />
  <div ref="divRef">Hello</div>
</template>

<script setup>
import { ref } from 'vue'

// 需要手动声明
const childRef = ref(null)
const divRef = ref(null)
</script>
```

使用 `useTemplateRef` 后更简洁：
```vue
<template>
  <ChildComponent :ref="childRef" />
  <div :ref="divRef">Hello</div>
</template>

<script setup>
import { useTemplateRef } from 'vue'

// 更简洁的声明
const childRef = useTemplateRef()
const divRef = useTemplateRef()
</script>
```

### 2. **更好的类型推断**
对于 TypeScript 用户，`useTemplateRef` 提供了更好的类型支持：
```typescript
// 指定具体的组件类型
const childRef = useTemplateRef<InstanceType<typeof ChildComponent>>()

// 指定 DOM 元素类型
const inputRef = useTemplateRef<HTMLInputElement>()
```

### 3. **解决模板中的条件引用问题**
在动态组件或条件渲染中，传统的 `ref` 可能导致引用丢失或类型问题：
```vue
<template>
  <ComponentA v-if="showA" :ref="componentRef" />
  <ComponentB v-else :ref="componentRef" />
</template>

<script setup>
// useTemplateRef 能更好地处理这种情况
const componentRef = useTemplateRef()
</script>
```

### 4. **与组合式函数更好地集成**
在组合式函数中使用时，`useTemplateRef` 返回标准的 `Ref` 对象：
```javascript
// composables/useForm.js
export function useForm() {
  const formRef = useTemplateRef<HTMLFormElement>()
  
  const submit = () => {
    if (formRef.value) {
      formRef.value.requestSubmit()
    }
  }
  
  return { formRef, submit }
}
```

## 实际使用示例：

```vue
<template>
  <!-- 使用 :ref 绑定 -->
  <input :ref="inputRef" />
  <MyModal :ref="modalRef" />
</template>

<script setup>
import { onMounted } from 'vue'
import MyModal from './MyModal.vue'
import { useTemplateRef } from 'vue'

// 创建引用
const inputRef = useTemplateRef<HTMLInputElement>()
const modalRef = useTemplateRef<InstanceType<typeof MyModal>>()

onMounted(() => {
  // 类型安全地访问
  if (inputRef.value) {
    inputRef.value.focus()  // 自动补全 HTMLInputElement 的方法
  }
  
  if (modalRef.value) {
    modalRef.value.open()  // 自动补全 MyModal 组件的方法
  }
})
</script>
```

## 与传统 `ref` 的比较：

| 特性 | 传统 `ref` | `useTemplateRef` |
|------|------------|------------------|
| 语法 | `ref="name"` | `:ref="name"` |
| 声明 | `const name = ref(null)` | `const name = useTemplateRef()` |
| 类型推断 | 需要手动指定泛型 | 可在创建时指定类型 |
| 在 `<script setup>` 中使用 | ✓ | ✓ |
| 在组合式函数中使用 | 需要参数传递 | 可直接使用 |
| 条件渲染支持 | 有限 | 更好 |

## 总结：

`useTemplateRef` 主要优化了开发体验，提供了：
- 更简洁的语法
- 更好的 TypeScript 支持
- 更一致的使用模式
- 更好的组合式函数集成

它不改变 Vue 的核心功能，但使得使用模板引用更加直观和类型安全，特别是在大型 TypeScript 项目中。