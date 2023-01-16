import { IAuthStore } from "./modules/auth/types";

export const namespaced = true;

export enum STORE_TYPE {
  AUTH = "AUTH",
}

export interface RootStateInterface {
  [STORE_TYPE.AUTH]: IAuthStore;
}
