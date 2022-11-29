<template>
    <div class="preview">
        <Render :content="content" />
        <button @click="canelPreview">取消预览</button>
    </div>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router'
import { onBeforeMount, ref} from 'vue'
import Render from '../render/Render.vue'
import metaStore from "../store/meta.js"
let content = ref()
let meta = metaStore()
onBeforeMount(() => {
    content.value = meta.get
    // console.log('preview', content.value)
})

let router = useRouter()
const canelPreview = () => {
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