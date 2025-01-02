# computed and watch
下面是如何在组合式API中区分使用 `computed` 和 `watch` 的场景：

### Computed 计算属性

**适用场景：**
- 当你需要基于其他响应式数据源创建派生的数据时。
- 当你希望计算的结果具有缓存性，即只有在其依赖项发生变化时才会重新计算。

**特点：**
- 使用 `computed` 函数创建一个计算属性。
- 它是惰性的，只有当它的值被访问时才会计算，并且如果其依赖没有改变，则会返回缓存的值。
- 支持getter/setter，以便实现双向绑定或对输入进行处理。

**例子：**
```javascript
<script setup>
import { ref, computed } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

// 创建一个计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});
</script>

<template>
  <p>{{ fullName }}</p>
</template>
```

### Watch 观察者

**适用场景：**
- 当需要监听一个或多个响应式数据源的变化并执行副作用操作时。
- 当需要异步操作、更改DOM或者其他不纯的操作时。
- 当需要在数据变化后执行复杂逻辑或者只关心特定依赖项的变化时。

**特点：**
- 使用 `watch` 或 `watchEffect` 函数来观察数据的变化。
- `watch` 可以指定监听哪些响应式数据源，并提供旧值和新值作为参数。
- `watchEffect` 则会在定义时立即执行一次，并自动追踪其中使用的响应式依赖，在依赖变化时再次执行。

**例子：**
```javascript
<script setup>
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);
const anotherRef = ref('initial value');

// 监听单个源
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});

// 监听多个源
watch([count, () => anotherRef.value], ([newCount, newAnother], [oldCount, oldAnother]) => {
  console.log(`count and anotherRef changed`);
});

// 立即执行并追踪依赖
watchEffect(() => {
  console.log(`count is: ${count.value}`);
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <!-- 假设这里有一个按钮可以增加 count 的值 -->
    <button @click="count++">Increment Count</button>
  </div>
</template>
```

总结来说，在组合式API中，`computed` 仍然用于创建基于其他响应式数据的派生状态，而 `watch` 则用于监听这些数据的变化并执行相应的副作用。选择哪一个取决于你的具体需求：如果你只是想要基于其他数据创建一个派生的状态，那么 `computed` 是更好的选择；如果你需要在数据变化时执行复杂的逻辑或副作用，那么你应该使用 `watch` 或 `watchEffect`。