import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store';
Vue.use(VueRouter);
// import tabContent from '@/components/tabContent';

import dashBoard from '@/pages/dashBoard/dashBoard';
import product_list from '@/pages/product_list/product_list';
import order_detail_connection from '@/pages/order_detail_connection/order_detail_connection';
import order_list from '@/pages/order_list/order_list';
import retreat_order_list from '@/pages/retreat_order_list/retreat_order_list';
import inventory_out_order_list from '@/pages/inventory_out_order_list/inventory_out_order_list';
import selling_out_details from '@/pages/selling_out_details/selling_out_details';

const components = {
  'dashBoard': dashBoard,
  'product_list': product_list,
  'order_detail_connection': order_detail_connection,
  'order_list': order_list,
  'retreat_order_list': retreat_order_list,
  'inventory_out_order_list': inventory_out_order_list,
  'selling_out_details': selling_out_details
};

Array.prototype.contains = function(obj) {
  let i = this.length;
  if (!i) {
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
  }
  return false;
};

function authToRoutes() {
  let routes = [{
    name: '主页',
    index: 'dashBoard',
    path: '/dashBoard',
    meta: {
      keepAlive: true
    },
    component: components.dashBoard
  }];

  Store.state.auths.forEach(auth => {
    if (auth.authorityName &&
      auth.authorityCode &&
      auth.authorityHtmlElement) {
      routes.push({
        name: auth.authorityName,
        index: auth.authorityCode,
        path: '/' + auth.authorityHtmlElement.substring(0, auth.authorityHtmlElement.indexOf('.')),
        meta: {
          keepAlive: true
        },
        component: components[auth.authorityHtmlElement.substring(0, auth.authorityHtmlElement.indexOf('.'))]
      });
    }
  });

  return routes;
}

export default new VueRouter({
  routes: authToRoutes()
});