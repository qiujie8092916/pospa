import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../../store';
import App from './admin.vue';
import router from '../../router/router.js';
// import VueResource from 'vue-resource';

import ElementUI from 'element-ui';
import '../../assets/css/variables.scss';

import '@/assets/css/theme.css';
import '@/assets/css/bootstrap.min.css';

Vue.use(ElementUI, { size: 'mini' });
// Vue.use(VueResource);
Vue.use(VueRouter);

const prod = process.env.NODE_ENV === 'production';
Vue.config.debug = prod;
Vue.config.devtools = prod;
Vue.config.productionTip = prod;

new Vue({ // eslint-disable-line
  router,
  store,
  // ...App
  render: h => h(App)
}).$mount('#admin');