import { BaseClientService } from "../BaseClientService";

class AuthService extends BaseClientService {
  constructor() {
    super();
  }

  public signup(): Promise<string> {
    return Promise.resolve("Signed up");
  }
}

export const authService = new AuthService();
