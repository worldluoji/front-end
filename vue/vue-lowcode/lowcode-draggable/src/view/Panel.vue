<template>
    <div class="panel" v-if="current && current.id">
        <component 
            :is="defineAsyncComponent(() => import(`../panel/${current.name}Panel.vue`))"
            :key="current.id"
            :props="panelProps"
            @change="change"
        ></component>
        <button @click="save">保存</button> &nbsp;&nbsp;
        <button @click="cancel">取消</button>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import metaStore from '../store/meta.js'
import currentPanelStore from '../store/currentPanel.js'

const meta = metaStore()
const currentPanel = storeToRefs(currentPanelStore())
const current = currentPanel.get
const panelProps = ref({})

const change = (p) => {
    // console.log('change', p)
    panelProps.value = p
}

const save = () => {
    // console.log(111, current.value, panelProps.value)
    meta.updateProps(current.value.id, panelProps.value)
}

const emits = defineEmits(['cancel'])
const cancel = () => {
    emits('cancel')
}
</script>

<style scoped>
.panel {
    background-color: #fff;
    width: 300px;
    height: 100vh;
    position: fixed;
    top: 5vh;
    right: 0;
    color: #000;
    border: 1px solid #eee;
    border-top: 0;
    border-bottom: 0;
    padding: 12px;
    z-index: 10;
}
</style>