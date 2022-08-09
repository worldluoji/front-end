import {App} from 'vue'
import ElContainer from './Container.vue'
import ElHeader from './Header.vue'
import ElFooter from './Footer.vue'
import ElAside from './Aside.vue'
import ElMain from './Main.vue'

// 我们对外暴露了一个对象，对象的 install 方法中，我们使用 app.component 即可注册这五个组件
export default {
  install(app:App){
    app.component(ElContainer.name,ElContainer)
    app.component(ElHeader.name,ElHeader)
    app.component(ElFooter.name,ElFooter)
    app.component(ElAside.name,ElAside)
    app.component(ElMain.name,ElMain)
  }
}