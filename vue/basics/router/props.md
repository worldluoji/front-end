# props
可以通过设置 props: true 来配置路由将 id 参数作为 prop 传递给组件
```js
const routes = [
  { path: '/user/:id', component: User, props: true }
]
```

```vue
<!-- User.vue -->
<script setup>
// 通过声明 prop 来在 User.vue 中删除对 $route 的直接依赖：
defineProps({
  id: String
})
</script>

<template>
  <div>
    User {{ id }}
  </div>
</template>
```
当 props 设置为 true 时，route.params 将被设置为组件的 props。

---

## reference
https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B0%86-props-%E4%BC%A0%E9%80%92%E7%BB%99%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6