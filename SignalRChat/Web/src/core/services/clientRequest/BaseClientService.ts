import { apiConfig as externalApiConfig } from "@/appsetings";
import axios from "axios";
import { API_ENPOINTS } from "./types/types";

export class BaseClientService {
  private readonly _apiUrl: string;

  constructor() {
    this._apiUrl = externalApiConfig.url.http || "/api";
  }

  protected Get(route: API_ENPOINTS, params: any = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this._apiUrl}${route}`, params)
        .then((response) => {
          console.log("axios", response);

          resolve(response.data);
        })
        .catch((error) => {
          console.log("axios", error);

          reject(error);
        })
    });
  }

  protected Post(route: API_ENPOINTS, data: any = null) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this._apiUrl}${route}`, data)
        .then((response) => {
          console.log("axios", response);

          resolve(response.data);
        })
        .catch((error) => {
          console.error("axios", error);

          reject(error);
        })
    });
  }
}
