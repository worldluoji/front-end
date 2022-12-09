<template>
    <div class="panel" v-if="current && current.id">
        <component 
            :is="defineAsyncComponent(() => import(`../panel/${current.name}Panel.vue`))"
            :key="current.id"
            :props="panelProps"
            @change="change"
        ></component>
        <hr>
        <Box @change="change" :props="panelProps.atomicAttrs"/>
        <hr>
        <el-button @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import metaStore from '../store/meta.js'
import currentPanelStore from '../store/currentPanel.js'
import Box from '../panel/sub/Box.vue'

const meta = metaStore()
const currentPanel = storeToRefs(currentPanelStore())
const current = currentPanel.get
const panelProps = ref({})

watch(current, (newVal) => {
    // console.log(111, newVal)
    let element = meta.getElementById(newVal.id)
    // console.log('new', p.currentId)
    if (element) {
        panelProps.value = element.props
        // console.log(222, panelProps.value)
    }
})

const change = (p) => {
    // console.log('before change', p)
    if (p.atomicAttrs) {
        delete panelProps.value.atomicAttrs
        panelProps.value.atomicAttrs = p.atomicAttrs;
    } else {
        Object.assign(panelProps.value, p);   
    }
    // console.log('after change', panelProps.value)
}

const save = () => {
    // console.log(111, panelProps.value, current)
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
    top: 100px;
    right: 0;
    color: #000;
    border: 1px solid #eee;
    border-top: 0;
    border-bottom: 0;
    padding: 12px;
    z-index: 10;
}
</style>