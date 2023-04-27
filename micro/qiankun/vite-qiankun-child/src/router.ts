import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHashHistory } from 'vue-router'
import PageO1 from './components/Page01.vue'
import PageO2 from './components/Page02.vue'

const router = createRouter({
  // hash模式
  history: createWebHashHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/app-01' : '/'
  ),
  routes: [
    {
      path: '/page01',
      component: PageO1,
    },
    {
      path: '/page02',
      component: PageO2,
    },
  ],
});

export default router;