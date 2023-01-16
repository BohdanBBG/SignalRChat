<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { getAvailableRoutes } from "@/router/helpers/routeHelpers";
import { AUTH_ACTIONS } from "@/store/modules/auth/types";
import { STORE_TYPE } from "@/store/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LoginComponent extends Vue {
  @Prop() private source!: string;

  public get AvailableRoutes() {
    return getAvailableRoutes();
  }

  public login() {
    this.$store
      .dispatch(`${STORE_TYPE.AUTH}/${AUTH_ACTIONS.LOGIN}`, true)
      .then((result) => {
        this.$router.push({ path: this.AvailableRoutes.home });
        console.log(11, result);
      })
      .catch((error) => console.error(error));
  }
}
</script>
