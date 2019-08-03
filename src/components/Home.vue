<template>
  <v-parallax dark>
    <v-layout align-center column justify-center>
      <h1 class="display-2 font-weight-thin mb-4">
          <v-icon x-large color="white">chat</v-icon>
          Chatbox
      </h1>
      <v-progress-linear indeterminate color="#AED581" class="mb-0" v-if="isLoading"></v-progress-linear>
      <div v-else>
        <h4 class="subheading">Start your chat today!</h4>
        <v-btn class="ma-3" round large dark color="#DD4B39" @click.prevent="login">
            <i class="fab fa-google"></i>
            <span style="margin-left: 12px">Login with Google</span>
        </v-btn>
      </div>
    </v-layout>
  </v-parallax>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isAuth', 'isLoading'
    ]),
  },
  methods: {
    login () {
      this.$store.dispatch('login');
    }
  }   
}
</script>