<template>
  <div class="dynamc-component">
    <ReactiveCounter />
  </div>
</template>

<script setup lang="ts">
import ReactiveCounter from "@/components/pinia/ReactiveCounter.vue";
</script>

<style scoped>
.outer {
  margin-top: 3px;
}
</style>
