import Vue from 'vue';
import App from './app';
import store from '../../store/store';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#app',
  store,
  render: h => h(App)
});