"use strict";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

//Vue.use(Vuetify);

Vue.config.productionTip = false


// new Vue({
//   el: "#app",
//   router,
//   store,
//   components: { App },
//   template: '<App />'
// });

new Vue({
  render: h => h(App),
  store,
  router,
  components: { App },
  template: '<App />',
  vuetify
}).$mount('#app')
