import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/store'
import '@/permission' // permission control
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

import Snackbar from '@/components/Snackbar/'
Vue.use(Snackbar)

import Alert from '@/components/Alert/Alert.vue'
Vue.component('Alert', Alert)

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import getLocale from '@/utils/getLocale'
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: getLocale('PLAY_LANG', 'zh'), // set locale
  messages: {
    en: require('./i18n/en.js'),
    zh: require('./i18n/zh.js')
  }
})

import uweb from 'vue-uweb'
let siteIdUWeb
const env = process.env.NODE_ENV
if (env === 'development') {
  siteIdUWeb = '1278254360'
} else {
  siteIdUWeb = '1278254360'
}
Vue.use(uweb, { siteId: siteIdUWeb, autoPageview: false })

export default new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
