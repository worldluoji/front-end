<template>
    <div>
        <button @click="open">open</button> <br>
        <button @click="close">close</button>
    </div>
</template>

<script setup lang="ts">
import { createModule } from '../components/jsx/DynamicModule';
// 创建和渲染组件
let mod: { open: any; close: any; };

const open = () => {
    mod = createModule();
    mod.open();
};

const close = () => {
    mod.close();
}
</script>

<style scoped>
button {
  margin: 3px 3px;
}
</style>