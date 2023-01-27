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
                    v-model="credentials.email"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="credentials.password"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="isLoginBtnLoading"
                  color="primary"
                  v-on:click="login"
                  >Login</v-btn
                >
              </v-card-actions>
              <div v-if="errors">
                {{ errors }}
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Credentials } from "@/core/services/clientRequest/types/types";
import { getAvailableRoutes } from "@/router/helpers/routeHelpers";
import { AUTH_ACTIONS } from "@/store/modules/auth/types";
import { STORE_TYPE } from "@/store/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LoginComponent extends Vue {
  public isLoginBtnLoading = false;
  public errors = "";
  public credentials = {} as Credentials;

  public get AvailableRoutes() {
    return getAvailableRoutes();
  }

  public login() {
    this.isLoginBtnLoading = true;

    this.$store
      .dispatch(`${STORE_TYPE.AUTH}/${AUTH_ACTIONS.LOGIN}`, this.credentials)
      .then((result) => {
        this.$router.push(this.$route.query.redirect as string);
        console.log("Login result", result);
      })
      .catch((err) => {
        this.errors = err;
        console.error(err);
      })
      .then(() => (this.isLoginBtnLoading = false));
  }

  private created() {
    if (!this.$route.query.new) {
      this.credentials.email = this.$route.query.email as string;
    }
  }
}
</script>
