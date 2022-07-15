<template>
  <div>
    <h2>{{ count }}</h2>
    <button @click="add">+</button>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from "../../store/index";
import { storeToRefs } from "pinia";
const store = mainStore();
// 使用 storeToRefs 去解构，可以实现跨组件响应
const { count } = storeToRefs(store);

const add = () => {
  store.count++;
};
</script>
