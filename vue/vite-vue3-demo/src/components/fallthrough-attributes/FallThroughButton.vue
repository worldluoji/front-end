<template>
    <BriefButton class="large" @click="onClick" />
</template>

<script setup lang="ts">
import BriefButton from './BriefButton.vue';

const onClick = () => {
    console.log('fall through button clicked');
};
</script>

<style scoped>
    .large {
        width: 60px;
    }
</style>