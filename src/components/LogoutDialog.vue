<template>
  <v-layout justify-center>
    <v-dialog v-model="isLogoutDialog" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Logout?</v-card-title>
        <v-card-text>Are you sure you want to logout Chatbox?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat text color="grey darken-1" @click="closeDislog">Close</v-btn>
          <v-btn flat text color="green darken-1" @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'isLogoutDialog'
      ])
    },
    methods: {
      logout () {
        this.$store.dispatch('logout');
      },
      closeDislog () {
        this.$store.commit("switchLogoutDialog", false);
      }
    }
  }
</script>
