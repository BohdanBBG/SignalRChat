import { ActionTree } from "vuex";
import { RootStateInterface } from "@/store/types";
import { AUTH_ACTIONS, AUTH_MUTATIONS, IAuthStore } from "./types";
import { authService } from "@/core/services/clientRequest/auth/AuthService";
import { Credentials } from "@/core/services/clientRequest/types/types";

const actions: ActionTree<IAuthStore, RootStateInterface> = {
  [AUTH_ACTIONS.LOGIN]: (ctx, credentials: Credentials) => {
    return new Promise((resolve, reject) => {
      authService
        .signup(credentials)
        .then((result: any) => {
          ctx.commit(AUTH_MUTATIONS.LOGGED_IN, true);

          resolve(result);
          localStorage.setItem('auth-token', result.token); // stash the auth token in localStorage
        })
        .catch((errors: any) => {
          // commit('authError', errors);
          localStorage.removeItem('auth-token');
          ctx.commit(AUTH_MUTATIONS.LOGGED_IN, false);

          reject(errors);
        });
    });
  },
};

export default actions;
