import { ApiConfig } from "./types";

export const developmentApiConfig: ApiConfig = {
  url: {
    http: "http://localhost:5001",
    https: null,
  },
};

export const productionApiConfig: ApiConfig = {
  url: {
    http: null,
    https: null,
  },
};

export const apiConfig: ApiConfig =
  process.env.NODE_ENV || "development"
    ? developmentApiConfig
    : productionApiConfig;
