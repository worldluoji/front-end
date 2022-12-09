<template>
    <div class="ListPanel">
        column: <input type="number" placeholder="请输入列数" v-model="data.column" @change="change"/>
    </div>
</template>

<script setup>
const p = defineProps({
    props: {
        type: Object,
        required: true
    }
})
const data = {
    column: p.props.column ? p.props.column: 1
}

const emit = defineEmits(['change'])
const change = () => {
    console.log(data)
    emit('change', data)
}
</script>

<style scoped>
    .ListPanel {
        width: 100%;
    }
</style>