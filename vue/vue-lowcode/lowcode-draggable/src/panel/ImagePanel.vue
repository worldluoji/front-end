<template>
    <div class="imagePanel">
        图片地址: <input placeholder="请输入图片url地址" v-model="data.url" @change="change"/> <br>
        图片高度: <input type="number"  placeholder="图片高度，默认自适应" v-model="data.height" @change="change"/> <br>
    </div>
</template>

<script setup>
const p = defineProps({
    props: Object
})
const data = {
    url: (p.props && p.props.url) ? p.props.url : '',
    height: (p.props && p.props.height) ? p.props.height : ''
};
const emit = defineEmits(['change']);
const change = () => {
    console.log(data)
    emit('change', data)
};
</script>

<style scoped>
    .imagePanel {
        width: 100%;
    }
</style>