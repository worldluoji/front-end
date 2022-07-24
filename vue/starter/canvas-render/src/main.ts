
import { Component } from '@vue/runtime-dom'
import CanvasStarter from './render'
import App from './App.vue'

function createApp (rootComponent: Component) {
  // const app = originCa(...args);
  return {
    mount (selector: any) {
      const canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      document.querySelector(selector).appendChild(canvas)
      const ctx = canvas.getContext('2d')
      if (ctx == null) {
        throw new Error('fail to get canvas context')
      }
      const app = CanvasStarter(ctx).createApp(rootComponent)
      app.mount(canvas)
    }
  }
}

createApp(App).mount('#app')
