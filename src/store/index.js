import Vue from 'vue';
import Vuex from 'vuex';
import authNav from './modules/authNav/index.js';
import multiTab from './modules/multiTab/index.js';
import dashBoard from './modules/dashBoard/';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authNav: authNav,
    multiTab: multiTab,
    dashBoard: dashBoard
  }
});