import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/dist/vuetify.min.css';

import { firestorePlugin } from 'vuefire';
import db from './db';
import store from './store/store'

Vue.use(Vuetify)
Vue.use(firestorePlugin)

Vue.config.productionTip = false;

new Vue({
  db,
  store,
  render: h => h(App),
}).$mount('#app');
