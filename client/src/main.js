"use strict";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store/store'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

import Default from "./layouts/Default";
import Landing from "./layouts/Landing";

Vue.component('default-layout', Default);
Vue.component('landing-layout', Landing);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router,
    components: { App },
    template: '<App />',
    vuetify
}).$mount('#app')
