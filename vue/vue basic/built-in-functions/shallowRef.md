# shallowRef
在 Vue 3 中，`shallowRef()` 是一种特殊的 `ref`，它创建一个浅层响应式的引用。这意味着如果你使用 `shallowRef()` 包装的对象或数组被修改时，只有当这个对象或数组本身被替换（即整个引用被一个新的对象或数组取代）时，Vue 才会触发视图更新。而如果只是修改了对象内部的属性或数组中的元素，则不会触发更新。

这对于某些场景来说是非常有用的，比如当你有一个大型的对象或数组，并且你知道你只会在少数情况下需要完全替换它们，或者你想要手动控制何时触发更新。

下面是一个使用 `<script setup>` 和组合式 API 的例子，演示如何使用 `shallowRef()`：

```vue
<template>
  <div>
    <p>用户信息: {{ user.name }} - {{ user.age }}</p>
    <button @click="updateName">更新名字</button>
    <button @click="replaceUser">替换用户对象</button>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';

// 使用 shallowRef 创建一个浅层响应式的引用
const user = shallowRef({
  name: '张三',
  age: 25,
});

// 更新对象内部的属性不会触发视图更新
const updateName = () => {
  // 这个更改不会导致视图更新
  user.value.name = '李四';
};

// 替换整个对象会触发视图更新
const replaceUser = () => {
  // 这个更改会导致视图更新
  user.value = {
    name: '王五',
    age: 30,
  };
};
</script>
```

在这个例子中，点击“更新名字”按钮将不会触发视图更新，因为这是对 `user` 对象内部属性的一个修改。然而，点击“替换用户对象”按钮将会替换整个 `user` 对象，因此会触发视图更新。

需要注意的是，如果你确实需要对 `shallowRef` 包装的对象内部属性进行响应式处理，你可以考虑使用 `triggerRef` 函数来手动触发更新。此外，如果你不确定是否需要浅层响应性，通常更安全的做法是使用普通的 `ref`，因为它总是深度响应式的。