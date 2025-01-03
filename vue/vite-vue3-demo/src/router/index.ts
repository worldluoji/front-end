import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
    // 懒加载，只有用户访问了 /dynamic 这个页面后，对应页面的代码才会加载执行。
    component: () =>
      import(
        "../views/DynamicComponentView.vue"
      ),
  },
  {
    path: "/directive",
    name: "directive",
    component: () =>
      import(
        "../views/SelfDefinedDirectiveView.vue"
      ),
  },
  {
    path: "/h",
    name: "h",
    component: () =>
      import("../views/RenderComponentView.vue"),
  },
  {
    path: "/built",
    name: "built",
    component: () =>
      import("../views/BuiltPluginView.vue"),
  },
  {
    path: "/reactive",
    name: "reactive",
    component: () =>
      import("../views/ReactiveView.vue"),
  },
  {
    path: "/pinia",
    name: "pinia",
    component: () =>
      import("../views/PiniaView.vue"),
  },
  {
    path: "/setup",
    name: "setup",
    component: () =>
      import("../views/SetupTestView.vue"),
  },
  {
    path: "/jsx",
    name: "jsx",
    component: () =>
      import("../components/jsx/CounterJSX.tsx"),
  },
  {
    path: "/dynmd",
    name: "dynmd",
    component: () =>
      import("../views/DynamicModuleView.vue"),
  },
  {
    path: "/dyform",
    name: "dyform",
    component: () =>
      import("../views/DynamicFormView.vue"),
  },
  {
    path: "/counterhook",
    name: "counterhook",
    component: () =>
      import("../views/CounterHooksView.vue"),
  },
  {
    path: "/fallthroughbtn",
    name: "fallthroughbtn",
    component: () =>
      import("../views/FallThroughButtonView.vue"),
  },
  {
    path: "/shallowref",
    name: "shallowref",
    component: () =>
      import("../views/ShallowRefView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
