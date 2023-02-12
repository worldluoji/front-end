import store from './store/index.js'
import router from './router.js'
import App from './app.vue'
import './assets/base.scss'

// 创建vue3的实例
const app = Vue.createApp(App)
  .use(store) // 挂载vuex
  .use(router) // 挂载路由
  .use(ElementPlus) // 加载ElementPlus
  .mount('#app') // 挂载Vue的app实例