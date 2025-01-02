# defineModel
Vue 3.4 引入了 `defineModel()` 宏，这是 Composition API 的一个新成员，旨在简化组件中响应式状态的管理，尤其是处理复杂组件状态时。它特别有助于实现父子组件之间的属性双向绑定。

### 简化双向绑定

在 `defineModel()` 出现之前，为了使自定义组件支持 `v-model` 双向绑定，开发者需要：

1. 在子组件中声明 `props` 来接收父组件传递的数据。
2. 当需要更新这个数据时，通过 `emits` 发出 `update:propName` 事件通知父组件进行更新。

这种做法对于每个要实现双向绑定的属性都需要重复编写类似的代码，显得繁琐。

### 使用 `defineModel()`

使用 `defineModel()` 后，可以大大简化上述过程。它返回一个 `ref`，该 `ref` 可以像其他响应式引用一样被访问和修改，并且它会自动处理与父组件变量之间的双向绑定。这意味着，当你修改 `defineModel()` 返回的值时，父组件中的相应属性也会自动更新，反之亦然。

#### 示例

**父组件**

```vue
<template>
  <child v-model:test="test">父组件： {{ test }}</child>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const test = ref('initial value');
</script>
```

**子组件**

```vue
<script setup lang="ts">
// 如果是默认的 model，则直接调用 defineModel()
// 对于命名的模型（如这里的 'test'），则需要传入名称
const inputValue = defineModel('test');
</script>

<template>
  <input v-model="inputValue" />
</template>
```

Vue3.4前的用法：
```vue
<!-- vue3.4前用法 -->
<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
```

### 支持多个 `v-model`

`defineModel()` 也支持在一个组件上同时绑定多个 `v-model` 实例，只需为每个模型指定不同的名称即可。例如，可以在一个表单组件中同时绑定用户的姓名和地址。

### 总结

`defineModel()` 是 Vue 3.4 中的一个重要改进，它不仅简化了代码，还提高了可读性和维护性。对于频繁使用 `v-model` 的场景来说，这是一个非常实用的新特性。如果你正在开发基于 Vue 3 的项目，建议尝试使用 `defineModel()` 来提升开发体验。