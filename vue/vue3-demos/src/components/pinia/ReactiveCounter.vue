<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ count }}</h2>
    <button @click="add">+</button>
    <button @click="patchUpdate">++</button>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from "../../store/index";
import { storeToRefs } from "pinia";
const store = mainStore();
// 使用 storeToRefs 去解构，可以实现跨组件响应
const { msg, count } = storeToRefs(store);

const add = () => {
  store.count++;
};

const msgs = ["TypeScript", "Go", "JavaScript", "Vue", "React"];

const patchUpdate = () => {
  const index = Math.floor(msgs.length * Math.random());
  store.$patch((state) => {
    state.msg = msgs[index];
    state.count++;
  });
};
</script>
