export enum AUTH_ACTIONS {
  LOGIN = "LOGIN",
}

export enum AUTH_MUTATIONS {
  LOGIN = "LOGIN",
}

export enum AUTH_GETTERS {
  IS_LOGGEDIN = "LOGIN",
}

export interface IAuthStore {
  loggedIn: boolean;
}
