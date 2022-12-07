<template>
    <div v-atomicattr="p.props.atomicAttrs">
        <van-nav-bar :title="(p.props && p.props.title) || '标题'" 
            :style="{'background-color': '#ee0a24'}"
        />
    </div>
</template>

<script setup>
const p = defineProps({
    props: Object,
    className: String,
})
</script>

<style>
    .van-nav-bar__title {
        color: whitesmoke;
    }
</style>