<template>
    <component :is="current"></component>
</template>

<script setup lang="ts">
// 引入打包好的ESM模块
import { allComponents } from './dist/origin-elements';
// 打包好的库，实际只要在本机上就能成import进来，所以可以先从远端下载到本机，然后加载
// import { allComponents } from '/Users/honorluo/front-end/js/node/static-server/dist/origin-elements.js';

// TODO 考虑远程加载
// import { importScript } from './importScript';
// import { onBeforeMount } from 'vue';
// onBeforeMount(async () => {
//     let s = await importScript('http://localhost/origin-elements.js');
//     console.log(s);
// })
let current = allComponents.BasicMobileComponents.NavBar;
</script>

<style scoped>
@import './dist/style.css';
</style>