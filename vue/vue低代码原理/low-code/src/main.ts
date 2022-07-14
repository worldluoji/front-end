import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)
  .use(router)
  .use(ElementPlus)

app.directive('drag', {
  mounted (el: HTMLElement) {
    el.onmousedown = (ev) => {
      console.log(ev)
      // 鼠标按下的位置
      const mouseXStart = ev.clientX
      const mouseYStart = ev.clientY
      // console.log('按下开始', mouseXStart, mouseYStart)

      // 当前滑块位置, el.offsetLeft 减去左边 left-side-bar 的宽度， 才是相对于 parent的距离，这里不是相对于屏幕
      const rectLeft = el.offsetLeft - window.innerWidth / 100 * 15
      const rectTop = el.offsetTop - window.innerHeight / 100 * 8

      document.onmousemove = (e) => {
        // 鼠标移动的位置
        const mouseXEnd = e.clientX
        const mouseYEnd = e.clientY
        const moveX = mouseXEnd - mouseXStart + rectLeft
        const moveY = mouseYEnd - mouseYStart + rectTop
        // console.log(rectLeft, rectTop)
        el.style.top = moveY + 'px'
        el.style.left = moveX + 'px'
      }
      document.onmouseup = () => {
        // console.log('鼠标抬起')
        // 取消事件
        document.onmousemove = null
      }
    }
  }
})

app.mount('#app')
