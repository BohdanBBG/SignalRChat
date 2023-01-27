import { Credentials } from "@/core/services/clientRequest/types/types";

export enum AUTH_ACTIONS {
  LOGIN = "LOGIN",
}

export enum AUTH_MUTATIONS {
  LOGIN = "LOGIN",
  LOGGED_IN = "LOGGED_IN",
}

export enum AUTH_GETTERS {
  IS_LOGGED_IN = "IS_LOGGED_IN",
}

export interface IAuthStore {
  loggedIn: boolean;
  credentials: Credentials | null
}
