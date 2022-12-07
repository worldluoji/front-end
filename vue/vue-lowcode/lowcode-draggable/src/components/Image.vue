<script setup>
const props = defineProps({
    props: Object,
    className: String,
})

const defaultUrl = 'https://img.tt98.com/d/file/96kaifa/20181009233732/5bbc9c7b22f00.jpg'

</script>

<template>
    <div class="image-wrapper" v-atomicattr="props.props.atomicAttrs">
        <img v-if="props.props"
            :src="props.props.url ? props.props.url: defaultUrl"
            :height="props.props.height"
            draggable="false"
        />
        <img v-else :src="defaultUrl"  />
    </div>
</template>

<style scoped>
    .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 100%;
    }
</style>