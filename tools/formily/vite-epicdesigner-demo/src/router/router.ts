import { createWebHistory, createRouter } from 'vue-router'

import BuilderView from '../components/BuilderView.vue'
import DesignView from '../components/DesignView.vue'

const routes = [
  { path: '/', component: DesignView },
  { path: '/builder', component: BuilderView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router