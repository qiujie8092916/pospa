import Vue from 'vue';
import Vuex from 'vuex';
import authNav from './modules/authNav/index.js';
import multiTab from './modules/multiTab/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: Object.assign(multiTab.state, authNav.state),
  getters: {},
  actions: {},
  mutations: multiTab.mutations
});