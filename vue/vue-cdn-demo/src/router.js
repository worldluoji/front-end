
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/home.vue')
  },
  {
    path: '/state',
    name: 'state',
    component: () => import('./views/state.vue')
  },
  {
    path: '/component',
    name: 'component',
    component: () => import('./views/component.vue')
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router