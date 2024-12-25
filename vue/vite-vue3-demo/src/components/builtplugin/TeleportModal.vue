<!-- https://staging-cn.vuejs.org/guide/built-ins/teleport.html#basic-usage 
<Teleport> 挂载时，传送门的 to 目标必须是已经存在于 DOM 之中。
理想情况下，这应该是整个 Vue 应用程序之外的一个元素。
如果目标是由 Vue 呈现的另一个元素，你需要确保在 <Teleport> 之前挂载该元素。
-->
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>
  <!-- 
    为 <Teleport> 指定的目标 to 期望接收一个 CSS 选择器字符串或者一个真实的 DOM 节点。这里我们其实就是让 Vue 去“传送这部分模板片段到 body 标签下”。 
    
    内置 <Teleport> 组件的一个已知约束是在 teleport 组件挂载时其目标元素必须存在。这可以防止用户在 teleport 后将内容传送到 Vue 渲染的其他元素。
    在 Vue 3.5 中，我们为 <Teleport> 引入了 defer prop，它会在当前渲染周期之后挂载它。
  -->
  <Teleport defer to="body">
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
