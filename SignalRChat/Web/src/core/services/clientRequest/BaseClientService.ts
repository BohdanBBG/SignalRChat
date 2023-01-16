import { apiConfig as externalApiConfig } from "@/appsetings";

export class BaseClientService {
  private readonly _apiUrl: string;

  constructor() {
    this._apiUrl = externalApiConfig.url.http || "/api";
  }
}
