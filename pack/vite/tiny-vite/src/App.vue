<template>
  <h1>Hello Tiny Vite</h1>
  <h2>
    <span>count is {{ count }} *2={{ double }}</span>
    <br />
    <button @click="count++">click me</button>
  </h2>
</template>

<script>
import { ref,computed } from 'vue'
export default {
  setup() {
    const count = ref(6)
    const add = () => {
      count.value++
    }
    const double = computed(() => count.value * 2)
    return {count, add, double}
  }
}
</script>

<style>
h1{
  color:red;
}
</style>