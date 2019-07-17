import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { firestorePlugin } from 'vuefire'

Vue.use(Vuetify)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
