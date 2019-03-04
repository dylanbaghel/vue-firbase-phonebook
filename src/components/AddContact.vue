<template>
  <div>
    <Loader v-if="loading" />
  <ContactForm v-else @contact-form-submit="addContact"/>
  </div>
</template>


<script>
import firebase from './../firebase/firebase'

import ContactForm from "./ContactForm"
import Loader from './Loader'
export default {
  name: "AddContact",
  data() {
    return {
      loading: false
    }
  },
  components: {
    ContactForm,
    Loader
  },
  methods: {
    addContact(data) {
      if (data) {
        this.loading = true
        firebase.collection(`users/${this.$store.state.auth.userId}/contacts`).add(data)
          .then(_ => {
            this.loading = false
            this.$router.replace('/contacts')
          })
          .catch(e => {
            this.loading = false
            console.log(e)
          })
      }
    }
  }
};
</script>
