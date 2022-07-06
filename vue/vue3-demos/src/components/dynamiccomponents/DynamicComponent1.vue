<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" />
</template>

<!-- 按定义渲染组件 (<script setup> 组合式 API) -->
<script setup lang="ts">
import Foo from "./Fooo.vue";
import Bar from "./Bar.vue";
</script>
