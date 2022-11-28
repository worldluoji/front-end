<template>
    <div class="navBarPanel">
        标题: <input placeholder="请输入标题" v-model="data.title" @change="change"/>
    </div>
</template>

<script setup>
    const data = {
        title: ''
    }
    const emit = defineEmits(['change'])
    const change = () => {
        console.log(data)
        emit('change', data)
    }
</script>

<style scoped>
    .navBarPanel {
        width: 100%;
    }
</style>