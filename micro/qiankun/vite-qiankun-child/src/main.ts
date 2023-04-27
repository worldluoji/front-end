// import { createApp } from 'vue'
// import './style.css'
import {
    renderWithQiankun,
    qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'
  
import { App as VueApp, createApp } from 'vue'
import router from './router'
import App from './App.vue'
  
  let app: VueApp<Element>;
  // console.log(123, qiankunWindow.__POWERED_BY_QIANKUN__);
  // qiankunWindow.__POWERED_BY_QIANKUN__ 通过主应用访问时才不为空
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    createApp(App).use(router).mount("#app");
  } else {
    renderWithQiankun({
      mount(props: any) {
        console.log("--app 01 mount");
  
        app = createApp(App);
        app.use(router);
        app.mount(
          (props.container
            ? props.container.querySelector("#app")
            : document.getElementById("app")) as Element
        );
      },
      bootstrap() {
        console.log("--app 01 bootstrap");
      },
      update() {
        console.log("--app 01 update");
      },
      unmount() {
        console.log("--app 01 unmount");
        app?.unmount();
      },
    });
  }