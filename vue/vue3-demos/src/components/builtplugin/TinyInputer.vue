<template>
  <div>Message is: <input type="text" v-model="msg" />{{ msg }}</div>
</template>

<script setup type="ts">
import { ref } from "vue";
const msg = ref("");
</script>
