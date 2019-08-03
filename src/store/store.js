import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import { db } from '../db';

Vue.use(Vuex);

const fAuth = db.auth();

const store = new Vuex.Store({
  state: {
    user: {},
    isAuth: false,
    isLogoutDialog: false,
    isLoading: false
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
    switchLogoutDialog (state, isOpened) {
      state.isLogoutDialog = isOpened;
    },
    switchLoading (state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    checkAuth ( { commit } ) {
      commit('switchLoading', true);
      fAuth.onAuthStateChanged(user => {
        if (user) {
            commit('setCurrentUser', user);
        } else {
            commit('cleanCurrentUser');
        }
        commit('switchLoading', false);
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
            commit('switchLogoutDialog', false);
        })
        .catch(err => console.log(err));
    }
  }
});

export default store;