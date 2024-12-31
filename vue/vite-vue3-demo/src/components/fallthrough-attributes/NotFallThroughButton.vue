<template>
    <BriefButton class="large" @click="onClick" />
</template>

<script setup lang="ts">

import BriefButton from './BriefButton2.vue';

const onClick = () => {
    console.log('not fall through button clicked');
};
</script>

<style scoped>
    .large {
        width: 60px;
    }
</style>