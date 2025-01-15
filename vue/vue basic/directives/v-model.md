# v-model
在vue3中, v-model是:modelValue和@update:modelValue的语法糖。

这意味着当你在组件上使用 `v-model` 时，Vue 实际上是在背后帮你绑定了一个 prop (`modelValue`) 用于传递数据给子组件，以及一个事件监听器 (`update:modelValue`) 用于监听来自子组件的数据更新。

例如，如果你有一个自定义输入组件 `MyInput`，你可以这样用 `v-model`：

```vue
<template>
  <MyInput v-model="message" />
</template>

<script setup>
import { ref } from 'vue';
import MyInput from './MyInput.vue';

const message = ref('Hello World');
</script>
```

这等价于：

```vue
<template>
  <MyInput :modelValue="message" @update:modelValue="newValue => message = newValue" />
</template>

<script setup>
import { ref } from 'vue';
import MyInput from './MyInput.vue';

const message = ref('Hello World');
</script>
```

而在 `MyInput` 组件内部，你需要确保它能接收 `modelValue` 并且能够触发 `update:modelValue` 事件来通知父组件值的变化：

```vue
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
```

这种机制使得 `v-model` 可以被用来创建双向绑定，并且不仅限于简单的 `<input>` 元素；它可以应用于任何你想要创建双向数据流的自定义组件。此外，`v-model` 在 Vue 3 中是可修饰的，意味着你可以为 `v-model` 添加修饰符，例如 `.trim`、`.number` 或者自定义修饰符，以便对输入进行处理。

对于更复杂的场景，Vue 3 还允许你通过指定不同的属性名和事件名来自定义 `v-model` 的行为，这可以通过 `v-model:[arg]` 的形式实现，其中 `[arg]` 是你想要绑定的 prop 名称。例如，`v-model:checked` 会绑定 `checked` 属性和 `update:checked` 事件。