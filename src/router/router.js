import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    name: '主页',
    path: '/dashBoard'
  }, {
    name: '基础资料维护',
    path: '/product_list'
  }, {
    name: '新建零售单',
    path: '/order_detail_connection'
  }, {
    name: '新建销售出库单',
    path: '/selling_out_details'
  }, {
    name: '零售单',
    path: '/order_list'
  }, {
    name: '零售退货单',
    path: '/retreat_order_list'
  }, {
    name: '销售出库单',
    path: '/inventory_out_order_list'
  }]
});