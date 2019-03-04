<template>
  <div class="mb-5">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">Phonebook</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="!auth.userId">
          <v-list-tile-content>
            <v-list-tile-title>Please Login To Continue</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="auth.userId" avatar>
          <v-list-tile-avatar>
            <img :src="auth.avatar" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ auth.username }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="auth.userId" replace to="/contacts">
          <v-list-tile-content>
            Contacts
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout" v-if="auth.userId">
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    logout() {
      this.$store.dispatch('startLogout').then(_ => {
        this.$router.push('/')
      }).catch(e => console.log(e));
    }
  }
};
</script>

