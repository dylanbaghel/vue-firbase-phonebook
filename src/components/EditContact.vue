<template>
  <div>
    <Loader v-if="loading" />
    <ContactForm v-if="!loading" v-bind:contact="contact" @contact-form-submit="editContact"/>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import firebase from './../firebase/firebase'

import ContactForm from "./ContactForm"
import Loader from './Loader'
export default {
  name: "EditContact",
  data() {
      return {
        loading: false
      };
  },
  components: {
    ContactForm,
    Loader
  },
  computed: {
    ...mapState({
      contact: state => state.contacts.viewContact
    })
  },
  methods: {
    ...mapActions(['startSetViewContact']),
    ...mapMutations(['setViewContact']),
    editContact(data) {
      if (data) {
        this.loading = true
        firebase.collection(`users/${this.$store.state.auth.userId}/contacts`)
          .doc(this.contact.id)
          .update(data)
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
  },
  created() {
    this.loading = true
    this.startSetViewContact({ id: this.$route.params.contactId })
      .then(() => this.loading = false)
  },
  destroyed() {
    this.setViewContact({ contact: null })
  },
  
};
</script>
