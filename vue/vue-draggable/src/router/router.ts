import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: () => import('../components/Home.vue'),
        },
        {
            path:'/twolist',
            component: () => import('../components/TwoListDraggable.vue'),
        },
        {
            path:'/clone',
            component: () => import('../components/Clone.vue'),
        },
        {
            path:'/simple',
            component: () => import('../components/Simple.vue'),
        }
    ]
})
export default router;