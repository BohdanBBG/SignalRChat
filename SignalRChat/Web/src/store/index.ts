import Vue from "vue";
import Vuex from "vuex";
import authStore from "./modules/auth";
import { STORE_TYPE } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    [STORE_TYPE.AUTH]: authStore,
  },
});
