import Vue from 'vue'
import Vuex from 'vuex'

import loginStatus from './loginStatus'
import toast from './toast'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginStatus,
    toast,
    
  }
})
