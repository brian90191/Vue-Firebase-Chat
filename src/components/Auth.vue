<template>
    <v-toolbar color="#26c6da" dark height="50">
        <v-icon color="darken-2">chat</v-icon>
        <v-toolbar-title>Chatbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn depressed color="red lighten-2" v-if="!isAuth" @click="login">
                Login
            </v-btn>
            <v-btn flat v-if="isAuth">
                <v-list-tile class="grow">
                    <v-list-tile-avatar size="32" color="grey darken-3">
                        <v-img class="elevation-6" :src="user.photoURL"></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span class="font-weight-light">{{ user.displayName }}</span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-btn>
            <v-btn depressed color="red lighten-2" v-if="isAuth" @click="logout">
                logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user', 'isAuth'
    ]),
  },
  created () {
    this.$store.dispatch('checkAuth');
  },
  methods: {
    login () {
      this.$store.dispatch('login');
    },

    logout () {
      this.$store.dispatch('logout');
    }
  }
}
</script>
