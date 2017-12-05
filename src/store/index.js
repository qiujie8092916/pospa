import Vue from 'vue';
import Vuex from 'vuex';
import multiTab from './modules/multiTab/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: multiTab.state,
  getters: {},
  actions: {},
  mutations: multiTab.mutations
});