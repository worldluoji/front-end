<script setup>
import { reactive } from 'vue';
const p = defineProps({
    props: Object,
    className: String,
})

const defaultUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
const props = reactive(p)

</script>

<template>
    <div class="container">
        <img v-if="props.props"
            :src="props.props.url ? props.props.url: defaultUrl"
            :height="props.props.height"
            draggable="false"
        />
        <img v-else :src="defaultUrl"  />
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 100%;
    }
</style>