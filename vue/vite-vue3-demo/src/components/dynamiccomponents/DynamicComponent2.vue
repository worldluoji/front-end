<template>
  <div>
    <!-- 使用注册名动态渲染组件 -->
    <component :is="view" />
    <!-- 渲染 HTML 元素 -->
    <component :is="href ? 'a' : 'span'">123</component>
  </div>
</template>

<script setup lang="ts">
import Bar from "./ABar.vue";

const view = Bar;
const href = "c";
</script>
