import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { ROUTE_NAME, ROUTE_PATH } from "./types/enums";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: ROUTE_PATH.HOME,
    name: ROUTE_NAME.HOME,
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (chatContainer.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "chatContainer" */ "../components/shared/chatComponent/chatContainer.vue"
      ),
  },
  {
    path: ROUTE_PATH.AUTH_LOGIN,
    name: ROUTE_NAME.AUTH_LOGIN,
    meta: { requiresAuth: true },
    component: () => import("../components/Auth/LoginForm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
