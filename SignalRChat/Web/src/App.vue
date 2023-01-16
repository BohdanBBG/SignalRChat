<template>
  <div>
    <v-app-bar v-if="!IsLogin" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Some Cool Chat</v-toolbar-title>
    </v-app-bar>

    <template v-if="!IsLogin">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item :to="AvailableRoutes.login">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-main>
      <keep-alive :include="['Login']">
        <router-view />
      </keep-alive>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ROUTE_PATH } from "@/router/types/enums";
import { getAvailableRoutes } from "@/router/helpers/routeHelpers";

@Component
export default class App extends Vue {
  public drawer = false;
  public group: any = null;

  public get IsLogin() {
    return this.$route.path.includes(ROUTE_PATH.AUTH_LOGIN);
  }

  public get AvailableRoutes() {
    return getAvailableRoutes();
  }
}
</script>
