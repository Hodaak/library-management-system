/*
*  FILE			    : main.js
*  PROJECT		    : SENG3080 - AWF :: Group Project
*  LAST VERSION     : 2023-04-13
*  DESCRIPTION	    : this file contains general imports that is going to be used generally in all files
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './services/base/service'
// To have access to icons for our UI
import '@fortawesome/fontawesome-free/js/all'
// Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/css/common.css'
// There are 4 types of alert: success, info, warning, error
import VueBasicAlert from 'vue-basic-alert'

createApp(App)
  .use(store)
  .use(router)
  .component('VueBasicAlert', VueBasicAlert)
  .provide('service', service) // add service instance to provide
  .mount('#app');
