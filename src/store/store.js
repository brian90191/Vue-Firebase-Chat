import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import { db } from '../db';

Vue.use(Vuex);

const fAuth = db.auth();
const fStore = db.firestore();

const store = new Vuex.Store({
  state: {
    user: {},
    isAuth: false,
    messages: [],
    inputMessage: ""
  },
  mutations: {
    setCurrentUser (state, user) {
        state.user = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        };
        state.isAuth = true;
    },
    cleanCurrentUser (state) {
        state.user = {};
        state.isAuth = false;
    },
    setMessages (state, messages) {
        state.messages = messages;
    }
  },
  actions: {
    checkAuth ( { commit } ) {
      fAuth.onAuthStateChanged(user => {
        if (user) {
            commit('setCurrentUser', user);
        } else {
            commit('cleanCurrentUser');
        }
      });

    },
    login ( { commit } ) {
      const authProvider = new firebase.auth.GoogleAuthProvider();
      fAuth.signInWithPopup(authProvider)
        .then(result => {
          commit('setCurrentUser', result.user);
        })
        .catch(err => console.error(err))
    },
    logout ( { commit } ) {
      fAuth.signOut()
        .then(() => {
            commit('cleanCurrentUser');
        })
        .catch(err => console.log(err))
    },
    bindMessage ( { commit } ) {
      this.$bind(
        'messages',
        fStore.collection('Message').orderBy('createTime')
      ).then(messages => {
        commit('setMessages', messages);
      });
    },
    addMessage() {
      if (this.inputMessage === '' || !this.isLogin) return;

      // Add message to firestore
      fStore.collection('Message')
        .add({
          'author': {
            'uid': this.user.uid,
            'name': this.user.displayName,
            'photoURL': this.user.photoURL,
            'email': this.user.email
          },
          'content': this.inputMessage,
          'createTime': firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(() => {
          this.inputMessage = '';
        });
    }

  }
});

export default store;