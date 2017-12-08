import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../store';
import App from './admin.vue';
import router from '../../router/router.js';
import VueResource from 'vue-resource';

import ElementUI from 'element-ui';
import '../../assets/css/variables.scss';
Vue.use(ElementUI, { size: 'mini' });
Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({ // eslint-disable-line
  router,
  store,
  // ...App
  render: h => h(App)
}).$mount('#admin');