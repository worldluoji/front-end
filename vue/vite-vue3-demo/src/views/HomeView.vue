<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/vue.svg" />
    <HelloWorld :msg="store.msg" />
    <h2>current count is : {{ count }}</h2>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { mainStore } from "../store/index";
import { storeToRefs } from "pinia";
const store = mainStore();
const { count } = storeToRefs(store);
</script>
