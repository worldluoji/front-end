<script setup lang="ts">
import CodeEditor from './components/CodeEditor.vue'
</script>

<template>
  <div class="container">
    <CodeEditor :language="`javascript`"/>
  </div>
</template>

<style scoped>
.container {
  width: 600px;
  height: 600px;
}
</style>