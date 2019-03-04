<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card raised hover>
          <v-toolbar dark color="primary">
            <v-toolbar-title v-if="contact">Edit Contact</v-toolbar-title>
            <v-toolbar-title v-else>Add Contact</v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit="onFormSubmit">
              <v-text-field v-model="name" :rules="nameRules" label="Name">
              </v-text-field>
              <v-text-field v-model="email" :rules="emailRules" label="Email">
              </v-text-field>
              <v-text-field type="number" v-model="phone" :rules="phoneRules" label="Phone">
              </v-text-field>
              <v-btn type="submit" :disabled="!valid" color="primary">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { isEmail } from 'validator';
export default {
  name: "ContactForm",
  props: ['contact'],
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
          v => !!v || "Name is Required"
      ],
      email: "",
      emailRules: [
          v => !!v || "Email is Required",
          v => (v && isEmail(v)) || "Email Must Valid"
      ],
      phone: "",
      phoneRules: [
          v => !!v || "Phone is Required"
      ],
      errors: {}
    };
  },
  methods: {
      onFormSubmit(e) {
          e.preventDefault();
          if (this.$refs.form.validate()) {
              this.$emit('contact-form-submit', {
                  name: this.name,
                  email: this.email,
                  phone: this.phone
              })
          }
      },
      prepopulate() {
        this.name = this.contact.name
        this.email = this.contact.email
        this.phone = this.contact.phone
      }
  },
  watch:{
    contact: 'prepopulate'
  },
  created() {
    this.prepopulate()
  }
};
</script>

