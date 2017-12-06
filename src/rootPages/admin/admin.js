import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../store';
import App from './admin.vue';
import router from '../../router/router.js';

import ElementUI from 'element-ui';
import '../../assets/theme/element-variables.scss';
Vue.use(ElementUI, { size: 'mini' });

Vue.use(VueRouter);

new Vue({ // eslint-disable-line
  el: '#admin',
  router,
  store,
  // ...App
  render: h => h(App)
});