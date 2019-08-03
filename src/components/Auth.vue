<template>
    <v-toolbar color="#26c6da" dark height="50" v-if="isAuth && !isLoading">
        <v-icon color="darken-2">chat</v-icon>
        <v-toolbar-title class="hidden-xs-only">Chatbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <div v-if="isAuth">
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
            </div>
            <v-btn flat v-if="isAuth" @click="openDialog(true)">
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
      'user', 'isAuth', 'isLogoutDialog', 'isLoading'
    ]),
  },
  created () {
    this.$store.dispatch('checkAuth');
  },
  methods: {
    logout () {
      this.$store.dispatch('logout');
    },
    openDialog () {
      this.$store.commit("switchLogoutDialog", true);
    }
  }
}
</script>
