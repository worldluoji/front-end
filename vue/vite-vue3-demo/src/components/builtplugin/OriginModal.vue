<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: rgb(193, 192, 190);
}

button {
  border-radius: 10px;
  background-color: aquamarine;
}
</style>
