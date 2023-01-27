import { Module } from "vuex";
import { namespaced, RootStateInterface } from "@/store/types";
import { IAuthStore } from "./types";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state: IAuthStore = {
  loggedIn: false,
  credentials: null,
};

const authStore: Module<IAuthStore, RootStateInterface> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};

export default authStore;
