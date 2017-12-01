import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app';

Vue.use(ElementUI);
Vue.use(Vuex);
new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
});