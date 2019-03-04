<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card raised hover>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-spacer></v-spacer>
          <v-container fill-height>
              <v-layout align-center justify-center>
              <v-btn @click="startLogin" color="primary" dark>Google</v-btn>
          </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  methods: {
    startLogin() {
      this.$store.dispatch('startLogin').then(() => {
        this.$router.replace('/contacts')
      }).catch(e => console.log(e))
    }
  },
};
</script>

