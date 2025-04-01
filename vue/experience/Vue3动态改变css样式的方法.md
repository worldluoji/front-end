# Vue3动态改变css样式的方法

在Vue 3中，动态改变CSS样式可以通过几种不同的方式来实现。以下是几种常见的方法：

### 1. 使用内联样式对象

你可以通过绑定 `:style` 属性到一个包含样式属性的对象上，这个对象可以是静态的，也可以是动态计算出来的。

**示例：**

```vue
<template>
  <div :style="dynamicStyles">Hello Vue!</div>
</template>

<script setup>
import { computed } from 'vue';

const dynamicStyles = computed(() => ({
  color: 'red',
  fontSize: '20px',
  // 可以根据其他响应式数据或逻辑动态设置样式
  backgroundColor: someCondition ? 'blue' : 'white'
}));
</script>
```

### 2. 动态绑定类名

使用 `v-bind:class` 或者简写 `:class` 来动态地应用CSS类。这允许你根据条件添加、移除或切换类。

**示例：**

```vue
<template>
  <div :class="[baseClass, { active: isActive }]">Hello Vue!</div>
</template>

<script setup>
import { ref } from 'vue';

const baseClass = 'base-style';
const isActive = ref(true);
</script>

<style scoped>
.base-style {
  font-size: 16px;
}
.active {
  background-color: green;
}
</style>
```

### 3. 使用CSS变量（自定义属性）

你可以将样式值存储为CSS变量，并通过JavaScript动态更改这些变量。这种方式对于需要频繁更新的样式特别有用。

**示例：**

```vue
<template>
  <div class="styled-element">Hello Vue!</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const root = ref(null);

onMounted(() => {
  const rootElement = root.value;
  if (rootElement) {
    rootElement.style.setProperty('--custom-color', 'purple');
  }
});
</script>

<style scoped>
.styled-element {
  color: var(--custom-color, blue); /* 默认颜色 */
}
</style>
```

### 4. 直接修改元素样式

如果你需要直接操作DOM元素的样式，可以直接访问元素并修改它的样式属性。通常这种方法用于处理特定的情况，例如动画结束后的回调等。

**示例：**

```vue
<template>
  <div ref="elementRef">Hello Vue!</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const elementRef = ref(null);

onMounted(() => {
  if (elementRef.value) {
    elementRef.value.style.color = 'orange';
  }
});
</script>
```

### 5. 使用CSS Modules

如果项目配置支持CSS Modules，你可以利用它来创建局部作用域的样式，并且可以根据状态动态绑定这些样式。

**示例：**

```vue
<template>
  <div :class="$style.container">Hello Vue!</div>
</template>

<script setup>
</script>

<style module>
.container {
  padding: 1em;
  border: 1px solid #ccc;
}
</style>
```

选择哪种方式取决于你的具体需求和项目的复杂性。大多数情况下，使用`:style`绑定内联样式对象或者`:class`绑定类名是最常用的方法，因为它们提供了良好的灵活性和性能。而当涉及到复杂的样式逻辑时，考虑使用CSS变量或者CSS Modules可能会更合适。