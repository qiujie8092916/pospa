import Vue from 'vue';
import store from '../../store/store';
import App from './admin.vue';
import VueRouter from 'vue-router';
import router from '../../router/router.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' });

Vue.use(VueRouter);

new Vue({ // eslint-disable-line
  el: '#admin',
  router,
  store,
  ...App,
  render: h => h(App)
});