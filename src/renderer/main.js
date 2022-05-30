import dotenv from 'dotenv'
dotenv.config()
process.env.BASE_URL='https://notes-app-backend-api.herokuapp.com'
import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueRouter);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(wysiwyg, {
  hideModules: {
    bold: false,
  },
}); // config is optional. more below

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
