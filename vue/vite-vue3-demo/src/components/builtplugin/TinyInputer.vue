<template>
  <div>Message is: <input type="text" v-model="msg" ref="msgInput"/>{{ msg }}</div>
</template>

<script setup type="ts">
// vue3.5 新特性 useTemplateRef
import { ref, useTemplateRef } from "vue";
const msg = ref("");
const msgInput = useTemplateRef("msgInput");
msgInput.value?.focus();
</script>
