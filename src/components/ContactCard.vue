<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ contact.name }}</div>
        <span>Email: {{ contact.email }}</span>
        <br>
        <span>Phone: {{ contact.phone }}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn :to="{ name: 'editContact', params: { contactId: contact.id } }" color="info">Edit</v-btn>
      <v-btn @click="deleteContact(contact.id)" color="error">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    contact: Object
  },
  methods: {
    ...mapActions(['deleteContact'])
  }
};
</script>

