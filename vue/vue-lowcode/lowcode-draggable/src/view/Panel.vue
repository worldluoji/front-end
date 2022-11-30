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
    // TODO 目前只更新楼层和一层容器
    // console.log(111, current.value, panelProps.value)
    let content = meta.get
    let it = content.find(c => c.id === current.value.id)
    if (!it) {
        let list = content.filter(c => c.name === 'List')
        // console.log(list)
        list.forEach(l => {
            if (l.props.list) {
                let tmp = l.props.list.find(t => { 
                    if (t.id === current.value.id) {
                        it = t
                        return t
                    }
                    if (t.name === 'Blank' && t.props.id === current.value.id) {
                        it = t.props
                        return t.props
                    } 
                }) 
                if (tmp) {
                    return
                }
            }
        })
    }
    if (!it) {
        return
    }
    if (!it.props) {
        it.props = {}
    }
    Object.assign(it.props, panelProps.value)
    console.log('save', it, content)
    meta.set(content)
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