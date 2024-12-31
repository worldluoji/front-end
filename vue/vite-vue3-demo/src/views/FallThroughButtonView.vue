<template>
    <div class="container">
        <FallThroughButton />
        <NotFallThroughButton />
    </div>
</template>

<script lang="ts" setup>
import FallThroughButton from '../components/fallthrough-attributes/FallThroughButton.vue';
import NotFallThroughButton from '../components/fallthrough-attributes/NotFallThroughButton.vue';
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
</style>