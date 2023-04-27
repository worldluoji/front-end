import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'

createApp(App).mount('#app')
if ('development' === import.meta.env.MODE) {
    registerMicroApps([
      {
        name: 'app_01',
        entry: '//localhost:8081/',
        container: '#container', // 对应 <main id="container"></main>
        activeRule: '/app_01',
      }
    ]);
} else {
  registerMicroApps([
    {
      name: 'app_01',
      entry: './sub/app-01',
      container: '#container',
      activeRule: '/app_01',
    }
  ])
}
  
setDefaultMountApp('/app_01')
  
// start qiankun
start()