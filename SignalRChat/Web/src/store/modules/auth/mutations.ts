import { Credentials } from "@/core/services/clientRequest/types/types";
import { MutationTree } from "vuex";
import { IAuthStore, AUTH_MUTATIONS } from "./types";

const mutations: MutationTree<IAuthStore> = {
  [AUTH_MUTATIONS.LOGIN](state: IAuthStore, credentials: Credentials) {
    state.credentials = credentials;
  },

  [AUTH_MUTATIONS.LOGGED_IN](state: IAuthStore, loggedIn: boolean) {
    state.loggedIn = loggedIn;
  },
};

export default mutations;
