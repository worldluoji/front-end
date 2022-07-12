<template>
  <div class="dynamc-component">
    <ReactiveButton />
    <hr />
    <DeepReactive />
  </div>
</template>

<script setup lang="ts">
import ReactiveButton from "@/components/reactive/ReactiveButton.vue";
import DeepReactive from "@/components/reactive/DeepReactive.vue";
</script>

<style scoped>
.outer {
  margin-top: 3px;
}
</style>
