<template>
    <div class="operation">
        <button @click="preview">预览</button>
        <button @click="seeSchame">Schema</button>
    </div>
</template>

<script setup>
import metaStore from '../store/meta.js'
import { useRouter } from 'vue-router'
const props = defineProps({
    content: Array,
})

const seeSchame = () => {
    console.log(JSON.stringify(props.content))
}

const meta = metaStore()
const router = useRouter()
const preview = () => {
    // params传参方式已经废弃了: https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
    // history模式state传参数只能是非响应式数据, 所以这里转了一下，更好的方式是用pinia来存
    meta.set(props.content)
    router.push({
        name: 'preview',
        path: '/preview',
        // state: {content: JSON.stringify(this.content)}
    })        
}
</script>

<style scoped>
  .operation {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2vh;
    column-gap: 2vw;
  }
</style>