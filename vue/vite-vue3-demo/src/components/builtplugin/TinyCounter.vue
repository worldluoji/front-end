<template>
  <div>
    count: {{ count }}
    <button @click="add">+</button>
  </div>
</template>

<script setup type="ts">
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value++
};
</script>
