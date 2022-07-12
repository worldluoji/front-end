<!-- https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#script-setup -->
<script setup>
import { reactive, nextTick } from "vue";

const state = reactive({ count: 0 });

function increment() {
  state.count++;
  console.log("count++");
  // 你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。
  // 若要等待一个状态改变后的 DOM 更新完成，你可以使用 nextTick() 这个全局 API
  nextTick(() => {
    // 访问更新后的 DOM
    console.log("Dom更新完毕");
  });
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
