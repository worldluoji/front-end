<template>
    <div class="preview">
        <Render :content="content" />
        <el-button @click="canelPreview">取消预览</el-button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, ref} from 'vue'
import Render from '../render/Render.vue'
import metaStore from "../store/meta.js"
import canvasStore from "../store/canvas.js"
let content = ref()
let meta = metaStore()
onBeforeMount(() => {
  content.value = meta.get
  // console.log('preview', content.value)
})

let router = useRouter()
let canvas = canvasStore()
const canelPreview = () => {
  canvas.setDesign(true)
  router.back()
}
</script>

<style scoped>
  .preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 2vh;
  }
</style>