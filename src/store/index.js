import Vue from 'vue';
import Vuex from 'vuex';
import authNav from './modules/authNav/index.js';
import multiTab from './modules/multiTab/index.js';

Vue.use(Vuex);

const state = Object.assign(
  multiTab.state,
  authNav.state
);

const mutations = Object.assign(
  multiTab.mutations
);

export default new Vuex.Store({
  modules: {},
  state,
  getters: {},
  actions: {},
  mutations
});