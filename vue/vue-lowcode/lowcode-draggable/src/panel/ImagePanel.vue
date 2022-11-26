<template>
    <div class="imagePanel">
        url:   <input placeholder="请输入图片url地址" v-model="data.url" @change="change"/> <br>
        height:<input type="number"  placeholder="图片高度，默认自适应" v-model="data.height" @change="change"/> <br>
    </div>
</template>

<script setup>
    const data = {
        url: '',
        height: ''
    }
    const emit = defineEmits(['change'])
    const change = () => {
        console.log(data)
        emit('change', data)
    }
</script>

<style scoped>
    .imagePanel {
        width: 100%;
    }
</style>