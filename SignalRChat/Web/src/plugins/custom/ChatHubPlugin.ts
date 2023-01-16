import { ChatHub } from "@/core/services/hubs/ChatHub";
import Vue from "vue";

export const ChatHubPlugin = {
  install: (vue: typeof Vue, options?: any) => {
    const chatHub = new ChatHub();

    // use new Vue instance as an event bus
    const newVueInstance = new Vue();

    vue.prototype.$chatHub = {
      events: newVueInstance,
      chatHubInstance: chatHub,
    };

    chatHub.registerServerEvents(newVueInstance);
    chatHub.start();
  },
};
