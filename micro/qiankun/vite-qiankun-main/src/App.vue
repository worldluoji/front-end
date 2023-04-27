<script setup lang="ts">
function toApp(path: string) {
  history.pushState({}, "", path);
}
</script>

<template>
  <header>
    <h3>App List:</h3>
    <a @click="toApp('/app_01')">app 01</a>
  </header>

  <main id="container"></main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e8e8e8;
}

a {
  margin: 0 10px;
}
</style>