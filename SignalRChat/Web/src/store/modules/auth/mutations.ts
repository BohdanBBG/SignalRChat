import { MutationTree } from "vuex";
import { IAuthStore, AUTH_MUTATIONS } from "./types";

const mutations: MutationTree<IAuthStore> = {
  [AUTH_MUTATIONS.LOGIN](state: IAuthStore, loggedIn: boolean) {
    state.loggedIn = loggedIn;
  },
};

export default mutations;
