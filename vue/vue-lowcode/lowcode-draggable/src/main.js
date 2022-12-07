import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DragManager from './dragmanager.js'
import AtomicAttributeManager from './atomicmanager.js'
import router from './router/router'
import { createPinia } from 'pinia'

const pinia = createPinia()

const dragManager = new DragManager()
const automitAttrManager = new AtomicAttributeManager()

createApp(App)
    .directive('draggable', (el) => {
        // v-draggable用在选择物料上，将内部组件加上draggable属性，并监听dragstart；
        el.querySelectorAll('[data-material]').forEach((el) => {
            el.draggable = true
        })
        el.addEventListener('dragstart', (e) => dragManager.dragstart(e))
    })
    .directive('dragcontent', (el, binding) => {
        // 监听了dragover 和 drop
        dragManager.setContainer(el, binding)
    })
    .directive('atomicattr', (el, binding)=> {
        // console.log(222, el, binding.value)
        automitAttrManager.setMargin(el, binding)
    })
    .use(router)
    .use(pinia)
    .mount('#app')
