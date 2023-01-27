import { BaseClientService } from "../BaseClientService";
import { API_ENPOINTS, Credentials } from "../types/types";

class AuthService extends BaseClientService {
  constructor() {
    super();
  }

  public signup(credentials: Credentials): Promise<any> {
    return this.Post(API_ENPOINTS.ACCOUNT_LOGIN, credentials);
  }
}

export const authService = new AuthService();
