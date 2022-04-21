import Vue from 'vue'
import App from './App.vue'


import RButton from './lib'
Vue.use(RButton)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
