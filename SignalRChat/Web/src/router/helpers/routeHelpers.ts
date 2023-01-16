import { ROUTE_PATH } from "../types/enums";

export function getAvailableRoutes() {
  return {
    home: ROUTE_PATH.HOME,
    login: ROUTE_PATH.AUTH_LOGIN,
  };
}
