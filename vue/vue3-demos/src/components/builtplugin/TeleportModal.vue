<!-- https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage -->
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>
  <!-- 为 <Teleport> 指定的目标 to 期望接收一个 CSS 选择器字符串或者一个真实的 DOM 节点。这里我们其实就是让 Vue 去“传送这部分模板片段到 body 标签下”。 -->
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: rgb(229, 232, 230);
  text-align: center;
}

button {
  border-radius: 10px;
  background-color: aqua;
}
</style>
