<template>
  <v-app>
    <v-navigation-drawer
        v-if="getAuthenticationStatus"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
              v-if="item.heading"
              :key="item.heading"
              align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
                cols="6"
                class="text-center"
            >
              <a
                  href="#!"
                  class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
              v-else
              :key="item.text"
              :to="item.link"
              link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        v-if="getAuthenticationStatus"
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Ambulu Admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{ name: 'Logout' }">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <router-view></router-view>

    <v-snackbar v-model="showSnackbar" :color="getSnackbarColor" top>
      {{ getSnackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
  import store from "./store"

  export default {
    name: 'App',
    data: () => {
      return {
        snackbarColor: 'success',
        snackbarMessage: '',
        dialog: false,
        drawer: null,
        items: [
          {
            icon: 'mdi-note',
            text: 'Surat',
            link: '/letter',
          },
          {
            icon: 'mdi-bookmark',
            text: 'Kategori Surat',
            link: '/letter-categories',
          },
        ],
      };
    },
    methods: {
      hideSnackbar() {
        store.dispatch('hideSnackbar');
      }
    },
    computed: {
      getAuthenticationStatus: () => {
        return store.getters.loggedIn;
      },
      getSnackbarColor: () => {
        return store.getters.snackbarColor;
      },
      showSnackbar: {
        get() {
          return store.getters.showSnackbar;
        },
        set(value){
          return store.commit('changeSnackbarValue', value);
        }
      },
      getSnackbarMessage: () => {
        return store.getters.snackbarMessage;
      }
    }
  };
</script>
