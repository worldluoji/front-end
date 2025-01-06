import { createApp } from 'vue'
import App from './App.vue'
// 引入epic-designer样式
import "epic-designer/dist/style.css";

// 引入Element plus样式
import "element-plus/dist/index.css";

import { setupElementPlus } from "epic-designer/dist/ui/elementPlus";
// 注册Element UI
setupElementPlus();

createApp(App).mount('#app')
