import {App} from 'vue'
import ElNotification from './Notification.vue'

export default {
  install(app:App){
    app.component(ElNotification.name, ElNotification)
  }
}