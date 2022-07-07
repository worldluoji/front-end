<template>
  <p>页面载入时，input 元素自动获取焦点：</p>
  <input v-focus />
</template>

<!-- 使用组合式代替下面声明式写法 -->
<script lang="ts" setup>
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>
<!-- <script>
const focus = {
  mounted: (el) => el.focus(),
};

export default {
  directives: {
    // 在模板中启用 v-focus
    focus,
  },
};
</script> -->
