<script setup>
import { reactive } from 'vue';
const p = defineProps({
    props: Object,
    className: String,
})

const defaultUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
const props = reactive(p)
if (!props.props.url) {
    props.props.url = defaultUrl
    props.props.height = ''
    props.props.width = ''
}

</script>

<template>
    <div class="container">
        <img
            :src="props.props.url ? props.props.url: defaultUrl"
            :height="props.props.height"
            draggable="false"
        />
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