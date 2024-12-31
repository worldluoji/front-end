<template>
    <button class="circle" @click="onClick">Click Me</button>
</template>

<script setup lang="ts">

import { useAttrs } from 'vue'

// you can access a component's fallthrough attributes
const attrs = useAttrs();

// not fallthrough
defineOptions({
  inheritAttrs: false
})

const onClick = () => {
    console.log('brief button clicked ', attrs);
};
</script>

<style scoped>
    .circle {
        border-radius: 50%;
        border: 1px solid black;
        background-color: brown;
        color: whitesmoke;
        padding: 2px;
    }
</style>