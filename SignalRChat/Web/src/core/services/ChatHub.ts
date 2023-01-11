import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import { ApiConfig } from "@/types";
import { apiConfig as externalApiConfig } from "@/appsetings";
import { SERVER_EVENTS } from "./types";

const CHATHUB_API_ENDPOINT = "/chat";

export class ChatHub {
  private _hubConnection: HubConnection;
  private _pathToApiChatHub: string;

  constructor(apiConfig: ApiConfig = externalApiConfig) {
    if (apiConfig.url.https) {
      this._pathToApiChatHub = apiConfig.url.https.concat(CHATHUB_API_ENDPOINT);
    } else if (apiConfig.url.http) {
      this._pathToApiChatHub = apiConfig.url.http.concat(CHATHUB_API_ENDPOINT);
    } else {
      this._pathToApiChatHub = CHATHUB_API_ENDPOINT;
    }

    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this._pathToApiChatHub)
      .configureLogging(
        process.env.NODE_ENV || "development"
          ? LogLevel.Debug
          : LogLevel.Information
      )
      .build();

    this._hubConnection.onclose(() => this.start());
  }

  public start() {
    let startedPromise: any = this._hubConnection.start().catch((err) => {
      console.error("Failed to connect with hub", err);
      return new Promise((resolve, reject) =>
        setTimeout(() => this.start().then(resolve).catch(reject), 5000)
      );
    });
    return startedPromise;
  }

  public Invoke(to: string, message: string) {
    this._hubConnection.invoke(to, message);
  }

  public registerServerEvents(Vue: any) {
    //Forward server side SignalR events through $questionHub, where components will listen to them
    this._hubConnection.on(SERVER_EVENTS.SEND, (text: string) => {
      Vue.$emit(SERVER_EVENTS.SEND, text);
    });
  }
}
