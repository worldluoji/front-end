<template>
  <div>
    <h1>{{ msg }}</h1>
    <MyButton
      color="blue"
      text="Click Child Button"
      @change="change"
      ref="childExposed"
    />
    <br />
    <button @click="changeChild">change child border-radius</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyButton from "./PropsAndEmitsButton.vue";
let msg = ref("Hello World");
const change = (content: string) => {
  console.log(content);
  msg.value = content;
};

const childExposed = ref();
const changeChild = () => {
  // eslint-disable-next-line
  childExposed.value.changeBorderRadius("20%");
};
</script>
