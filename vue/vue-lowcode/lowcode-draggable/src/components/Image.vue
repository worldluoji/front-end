<script setup>
defineProps({
    props: Object,
    className: String,
})
</script>

<template>
    <div class="container">
        <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            draggable="false"
        />
    </div>
</template>

<style scoped>
    img {
        width: 100%;
    }
</style>