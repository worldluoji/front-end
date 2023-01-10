<template>
    <component :is="current"></component>
</template>

<script setup lang="ts">
// 引入打包好的ESM模块
import { allComponents } from './dist/origin-elements';
let current = allComponents.BasicMobileComponents.NavBar;
</script>

<style scoped>
@import './dist/style.css';
</style>>