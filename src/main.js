import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import initCss from '@/assets/css/index.css'
Vue.use(initCss)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
