<template>
  <div>
    <v-container fluid grid-list-lg>
        <Loader v-if="loading" />
        <h1 v-else-if="contacts.length === 0">No Contact Created....</h1>
        <h1 v-else class="mb-3">Contacts</h1>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="contact in contacts" :key="contact.id">
                <ContactCard v-bind:contact="contact" />
            </v-flex>
        </v-layout>
        <v-btn
            fab
            color="red darken-2"
            dark
            fixed
            bottom
            right
            @click="$router.push('/add')"
        >
            <v-icon>add</v-icon>
        </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactCard from './ContactCard'
import Loader from './Loader'
export default {
    data() {
        return {
            loading: false
        }
    },
    components: {
        ContactCard,
        Loader
    },
    computed: {
        ...mapGetters(['contacts'])
    },
    created() {
        this.loading = true
        this.$store.dispatch('startFetchingContacts').then(() => {
            this.loading = false
        });
    }
}
</script>

