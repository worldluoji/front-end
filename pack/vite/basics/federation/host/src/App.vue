<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import RemoteApp from "remote_app/App";
import { add } from "remote_app/utils";
import { defineAsyncComponent } from "vue";
const AysncRemoteButton = defineAsyncComponent(
  () => import("remote_app/Button")
);
const data: number = add(1, 2);
</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/vue.svg" />
    <HelloWorld msg="这是Local应用"/>
    <RemoteApp />
    <AysncRemoteButton />
    <p>Remote应用工具函数计算结果: 1 + 2 = {{ data }}</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>