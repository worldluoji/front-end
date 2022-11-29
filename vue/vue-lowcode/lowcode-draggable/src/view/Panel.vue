<template>
    <div class="panel" v-if="props.current && props.current.id">
        <component 
            :is="defineAsyncComponent(() => import(`../panel/${props.current.name}Panel.vue`))"
            :key="props.current.id"
            :props="panelProps"
            @change="change"
        ></component>
        <button @click="save">保存</button> &nbsp;&nbsp;
        <button @click="cancel">取消</button>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import metaStore from '../store/meta.js'
const props = defineProps({
    current: Object
})
// console.log('in', props)
const meta = metaStore()
const panelProps = ref({})

const change = (p) => {
    // console.log('change', p)
    panelProps.value = p
}

const save = () => {
    // TODO 目前只更新楼层和一层容器
    let content = meta.get
    let it = content.find(c => c.id === props.current.id)
    if (!it) {
        let list = content.filter(c => c.name === 'List')
        console.log(list)
        list.forEach(l => {
            if (l.props.list) {
                let tmp = l.props.list.find(t => t.id === props.current.id)
                if (tmp) {
                    it = tmp
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