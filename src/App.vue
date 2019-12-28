<template>
  <v-app>
    <span>
      <v-app-bar app dark height="56">
        <v-btn class icon @click="$router.go(-1)">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-toolbar-title class="orange--text font-weight-bold">{{ $route.name }}</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn class icon @click.stop="drawer = !drawer">
          <v-icon color="white">mdi-view-dashboard</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        app
        persistent
        temporary
        v-model="drawer"
        width="250"
        dark
        enable-resize-watcher
        class="orange py-0"
      >
        <template>
          <v-list class="py-0">
            <v-list-item :to="{name:'Dashboard'}">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>DASHBOARD</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
              <v-list-item :to="{name:'Project'}">
                <v-list-item-icon>
                  <v-icon>mdi-atom</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>PROJECT</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
              <v-list-item :to="{name: 'Login'}">
                <v-list-item-icon>
                  <v-icon>mdi-account-key-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>LOGIN</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
              <v-list-item :to="{name:'Register'}">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>REGISTER</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
              <v-list-item :to="{name:'Account'}">
                <v-list-item-icon>
                  <v-icon>mdi-account-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>ACCOUNT</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
              <v-list-item to="/">
                <v-list-item-icon>
                  <v-icon>mdi-help-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>HELP</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
            <v-list-item v-ripple @click.native="logout"  class>
                <v-list-item-icon>
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>LOGOUT</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
    </span>
    <v-content class="white">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
const fb = require('./firebaseConfig');

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      xx: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    studentProfile() {
      return this.$store.studentProfile;
    },
  },
  methods: {
    logout() {
      fb.auth.signOut()
        .then(() => {
          this.$store.dispatch('clearData');
          this.$router.push('/loginView');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
</style>
