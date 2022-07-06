import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dynamic",
    name: "dynamic",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "dynamic" */ "../views/DynamicComponentView.vue"
      ),
  },
  {
    path: "/directive",
    name: "directive",
    component: () =>
      import(
        /* webpackChunkName: "directive" */ "../views/SelfDefinedDirectiveView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
