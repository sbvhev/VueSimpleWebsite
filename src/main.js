// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import VuesticPlugin from 'vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'

const sharedGetterConfig = store.getters['shared/config']

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

let mediaHandler = () => {
  if (window.matchMedia(sharedGetterConfig.windowMatchSizeLg).matches) {
    store.dispatch('shared/toggleSidebar', true)
  } else {
    store.dispatch('shared/toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('shared/setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('shared/setLoading', false)
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
