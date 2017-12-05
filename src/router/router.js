import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    name: '主页',
    path: '/admin'
  }, {
    name: '我的工作台',
    path: '/home'
  }, {
    name: '任务列表',
    path: '/time-entries'
  }]
});