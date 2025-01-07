import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
// 引入epic-designer样式
import "epic-designer/dist/style.css";

// 引入Element plus样式
import "element-plus/dist/index.css";

import { setupElementPlus } from "epic-designer/dist/ui/elementPlus";
import { setupDesignerExtensions } from "./designer-extensions";

// 执行扩展函数
setupDesignerExtensions();

// 注册Element UI
setupElementPlus();

createApp(App)
    .use(router)
    .mount('#app')
