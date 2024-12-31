<template>
    <button class="circle" @click="onClick">Click Me</button>
</template>

<script setup lang="ts">
const onClick = () => {
    console.log('brief button clicked ');
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