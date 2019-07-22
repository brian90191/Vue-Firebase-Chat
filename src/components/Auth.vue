<template>
    <v-toolbar color="transparent">
        <v-toolbar-title>Chatbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn depressed color="red lighten-2" v-if="!isAuth" @click="login">
                Login
            </v-btn>
            <v-btn flat v-if="isAuth">
                <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                        <v-img class="elevation-6" :src="user.photoURL"></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <span class="title font-weight-light">{{ user.displayName }}</span>
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
import firebase from 'firebase/app'
import { db } from '../db'
const fAuth = db.auth()

export default {
  data () {
    return {
      user: {},
      isAuth: false
    }
  },
  created () {
    fAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
        this.isAuth = true
        this.$emit('setUser', user)
      } else {
        this.user = {}
        this.isAuth = false
        this.$emit('cleanUser')
      }
    })
  },
  methods: {
    login () {
      const authProvider = new firebase.auth.GoogleAuthProvider()
      fAuth.signInWithPopup(authProvider)
        .then(result => {
          this.user = result.user
          this.isAuth = true
          this.$emit('setUser', result.user)
        })
        .catch(err => console.error(err))
    },

    logout () {
      fAuth.signOut()
        .then(() => {
          this.user = {}
          this.isAuth = false
          this.$emit('cleanUser')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
