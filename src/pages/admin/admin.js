import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini' });

import Vue from 'vue';
import store from '../../store/store';
import App from './admin.vue';

const router = require('../../router/router.js');

new Vue({ // eslint-disable-line
  el: '#admin',
  router: router.router,
  store,
  ...App,
  render: h => h(App)
});