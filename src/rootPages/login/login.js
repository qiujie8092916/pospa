import Vue from 'vue';
import App from './login.vue';
import store from '../../store/store';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#login',
  store,
  render: h => h(App)
});