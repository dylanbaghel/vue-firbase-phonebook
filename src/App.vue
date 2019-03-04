<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { firebase } from "./firebase/firebase";
window.fire = firebase;
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      //
    };
  },
  beforeCreate() {
    
  }
};
</script>
