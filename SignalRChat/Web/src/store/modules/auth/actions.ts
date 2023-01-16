import { ActionTree } from "vuex";
import { RootStateInterface } from "@/store/types";
import { AUTH_ACTIONS, AUTH_MUTATIONS, IAuthStore } from "./types";
import { authService } from "@/core/services/clientRequest/auth/AuthService";

const actions: ActionTree<IAuthStore, RootStateInterface> = {
  [AUTH_ACTIONS.LOGIN]: (ctx, loggedIn: boolean) => {
    return new Promise((resolve, reject) => {
      authService
        .signup()
        .then((status: any) => {
          ctx.commit(AUTH_MUTATIONS.LOGIN, loggedIn);
          resolve(status);
        })
        .catch((status: any) => reject(status));
    });
  },
};

export default actions;
