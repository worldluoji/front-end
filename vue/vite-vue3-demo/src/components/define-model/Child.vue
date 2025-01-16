<template>
    <input v-model="model" />
    <button @click="handelReset">reset</button>
  </template>
  
  <script setup lang="ts">
  const model = defineModel();
  
  function handelReset() {
    model.value = "init";
  }
  </script>