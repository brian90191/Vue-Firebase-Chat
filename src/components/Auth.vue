<template>
  <v-toolbar color="teal lighten-2" dark>
    <v-avatar size="36" v-show="isAuth && user !== {}">
      <img :src="user.photoURL ? user.photoURL : ''" alt="avatar">
    </v-avatar>

    <v-toolbar-title v-if="isAuth && user !== {}">{{ user.displayName }}</v-toolbar-title>
    <v-toolbar-title v-else>Let's chat in URL</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn depressed color="red lighten-2" v-if="!isAuth" @click="login">
      Login
    </v-btn>
    <v-btn flat v-else @click="logout">
      Logout
    </v-btn>

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
        // this.$emit('setUser', user)
      } else {
        this.user = {}
        this.isAuth = false
        // this.$emit('cleanUser')
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
