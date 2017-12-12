import Vue from 'vue';
import App from './login.vue';
// import store from '../../store';
import ElementUI from 'element-ui';
import '@/assets/css/variables.scss';

import '@/assets/css/theme.css';
import '@/assets/css/bootstrap.min.css';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#login',
  // store,
  ...App
});