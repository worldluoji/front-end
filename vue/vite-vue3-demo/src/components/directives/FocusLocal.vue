<template>
  <p>页面载入时，input 元素自动获取焦点：</p>
  <input v-focus />
</template>

<script lang="ts" setup>
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>
