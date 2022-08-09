import { createApp } from 'vue'
import App from './App.vue'
import ElComponents from './components'

const app = createApp(App)
ElComponents.install(app)
app.mount('#app')

