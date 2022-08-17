
<template>
 <el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
  <el-footer>Footer</el-footer>
</el-container>

<hr>

<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <ElNotification />
    </el-main>
  </el-container>
</el-container>

<hr>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <ElButton type="danger" size="medium" @click="showDialog">Click Me</ElButton>
      <ElDialog :appendToBody="dialogVisiable" v-if="dialogVisiable">
        <ElButton type="danger" size="medium" @click="showDialog">Close</ElButton>
      </ElDialog>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ElButton from './components/Button/Button.vue'
import ElDialog from './components/Dialog/Dialog.vue'
import ElNotification from './components/Notification/Notification.vue'
const dialogVisiable = ref(false)
const showDialog = () => {
  dialogVisiable.value = !dialogVisiable.value
}

const notificationVisiable = ref(false)
const showNotification = () => {
  notificationVisiable.value = !notificationVisiable.value
}

</script>

<style lang="scss" scoped>
body {
  width:1000px;
  margin:10px auto;
}
.el-header,
.el-footer {
  background-color: aqua;
}
</style>
