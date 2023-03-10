import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ChatHubPlugin } from "./plugins/custom/ChatHubPlugin";

Vue.config.productionTip = false;
Vue.use(ChatHubPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
