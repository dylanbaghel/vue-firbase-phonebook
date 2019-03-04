import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import { firebase } from './firebase/firebase'
import store from './store/store';
import router from './router';

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const { uid, displayName, photoURL } = user;
    const payload = {
      userId: uid,
      username: displayName,
      avatar: photoURL
    };
    store.commit('setUser', payload);
    renderApp();
  } else {
    store.commit('setUser');
    renderApp();
  }
});

const renderApp = () => {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')  
}