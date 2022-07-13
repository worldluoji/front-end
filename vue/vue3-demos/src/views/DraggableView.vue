<template>
  <div class="draggable-component">
    <DraggableComponent1 />
  </div>
</template>

<script setup lang="ts">
import DraggableComponent1 from "@/components/draggable/DraggableComponent1.vue";
</script>
<style scoped>
.draggable-component {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
