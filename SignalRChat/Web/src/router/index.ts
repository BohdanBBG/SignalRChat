import store from "@/store/index";
import { AUTH_GETTERS } from "@/store/modules/auth/types";
import { STORE_TYPE } from "@/store/types";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import { ROUTE_NAME, ROUTE_PATH } from "./types/enums";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: ROUTE_PATH.HOME,
    name: ROUTE_NAME.HOME,
    children: [
      {
        path: ROUTE_PATH.CHAT,
        name: ROUTE_NAME.CHAT,
        meta: {
          requiresAuth: true,
        },
        component: () =>
          // route level code-splitting
          // this generates a separate chunk (chatContainer.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          import(
            /* webpackChunkName: "chatContainer" */ "../components/shared/chatComponent/chatContainer.vue"
          ),
      },
    ],
  },

  {
    path: ROUTE_PATH.AUTH_LOGIN,
    name: ROUTE_NAME.AUTH_LOGIN,
    component: () => import("../components/Auth/LoginForm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(12, store.getters[`${STORE_TYPE.AUTH}/${AUTH_GETTERS.IS_LOGGED_IN}`]);
    if (!store.getters[`${STORE_TYPE.AUTH}/${AUTH_GETTERS.IS_LOGGED_IN}`]) {
      next({
        path: ROUTE_PATH.AUTH_LOGIN,
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
