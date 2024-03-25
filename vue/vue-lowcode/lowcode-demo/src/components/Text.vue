<template>
  <span>{{ p.v || '' }}</span>
</template>

<script setup lang="ts">
const p = withDefaults(defineProps<{v: string}>(), {
  v: 'loading...',
});
</script>