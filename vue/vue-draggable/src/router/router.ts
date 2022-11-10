import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: () => import('../App.vue'),
        },
        {
            path:'/twolist',
            component: () => import('../components/TwoListDraggable.vue'),
        }
    ]
})
export default router;