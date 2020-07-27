<template>
  <v-main>
    <v-container
        class="fill-height"
        fluid
    >
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
                color="primary"
                dark
                flat
            >
              <v-toolbar-title>Login Admin Desa</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                    label="Username"
                    id="username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                ></v-text-field>

                <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="authLogin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="showError" color="red" top>
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="showError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
  import AuthService from "@/services/auth.service";

  export default {
    props: {
      source: String,
    },
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        showError: false
      }
    },
    methods: {
      authLogin() {
        if (this.username !== '' && this.password !== '') {
          AuthService.login(this.username, this.password)
            .then(response => {
              if (response.statusCode === 200) {
                this.$store.dispatch('authLogin', {
                  token: response.data.token,
                  user: response.data.user
                });
                this.$router.push({
                  name: 'Letter'
                })
              } else {
                this.showError = true;
                this.errorMessage = response.message;
              }
            })
        } else {
          this.errorMessage = 'Silahkan isi username dan password anda';
          this.showError = true;
        }
      }
    }
  }
</script>
