import authNav from './modules/authNav'
import multiTab from './modules/multiTab'
import dashBoard from './modules/dashBoard'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authNav,
    multiTab,
    dashBoard
  }
})
