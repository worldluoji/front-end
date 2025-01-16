<template>
    <CommonChild v-model="inputValue" />
    <p>input value is: {{ inputValue }}</p>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import CommonChild from "./Child.vue";

const inputValue = ref();
</script>
  