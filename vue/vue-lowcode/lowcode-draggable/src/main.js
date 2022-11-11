import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DragManager from './dragmanager.js'

const dragManager = new DragManager

createApp(App)
    .directive('draggable', (el) => {
        // v-draggable用在选择物料上，将内部组件加上draggable属性，并监听dragstart；
        el.querySelectorAll('[data-material]').forEach((el) => {
            el.draggable = true
        })
        el.addEventListener('dragstart', (e) => dragManager.dragstart(e))
    })
    .directive('dragcontent', (el, binding) => {
        // v-dragcontent用在画布上，对每一个没有加上draggable的material-item加上draggable属性，监听dragstart
        el.querySelectorAll('.material-item:not([draggable])').forEach(el => {
            if (!el.draggable) {
                el.draggable = true
                el.addEventListener('dragstart', (e) => dragManager.dragexist(e))
            }
        })
        
        // 监听了dragover 和 drop
        dragManager.setContainer(el, binding)
    })
    .mount('#app')
