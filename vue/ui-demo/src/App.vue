
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
    <el-main>Main</el-main>
  </el-container>
</el-container>

<hr>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <ElButton type="danger" size="medium">Click Me</ElButton>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
</template>

<script setup lang="ts">
import ElButton from './Components/Button/Button.vue'
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
