import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store';
Vue.use(VueRouter);
// import tabContent from '@/components/tabContent';

function authToRoutes() {
  let routes = [{
    // props: true,
    name: '主页',
    index: 'dashBoard',
    path: '/dashBoard',
    meta: {
      keepAlive: true
    },
    component: resolve => require(['@/pages/dashBoard/dashBoard'], resolve)
  }];

  Store.state.auths.forEach(auth => {
    if (auth.authorityName &&
      auth.authorityCode &&
      auth.authorityHtmlElement) {
      let componentName = auth.authorityHtmlElement.substring(0, auth.authorityHtmlElement.indexOf('.'));
      routes.push({
        // props: true,
        name: auth.authorityName,
        index: auth.authorityCode,
        path: '/' + componentName,
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/pages/' + componentName + '/' + componentName], resolve)
      });
    }
  });

  return routes;
}

const router = new VueRouter({
  routes: authToRoutes(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;