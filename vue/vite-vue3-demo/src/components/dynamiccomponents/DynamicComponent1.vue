<template>
  <component :is="view > 0.5 ? Foo : Bar" />
</template>

<!-- 按定义渲染组件 (<script setup> 组合式 API) -->
<script setup lang="ts">
import Foo from "./AFooo.vue";
import Bar from "./ABar.vue";
const props = defineProps({
  view: { type: Number, required: true },
});
props.view;
</script>
