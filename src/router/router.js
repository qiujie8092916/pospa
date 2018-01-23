import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import dashBoard from '@/pages/dashBoard/dashBoard'
Vue.use(VueRouter)

function authToRoutes () {
  let routes = [{
    path: '',
    redirect: '/dashBoard'
  }, {
    // props: true,
    name: '主页',
    index: 'dashBoard',
    path: '/dashBoard',
    // alias: '/',
    meta: {
      keepAlive: true
    },
    component: dashBoard
  }]

  Store.state.authNav.auths.forEach(auth => {
    if (auth.authorityName &&
      auth.authorityCode &&
      auth.authorityHtmlElement) {
      let componentName = auth.authorityHtmlElement.split('.')[0]
      routes.push({
        // props: true,
        name: auth.authorityName,
        index: auth.authorityCode,
        path: '/' + componentName,
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/pages/' + componentName + '/' + componentName], resolve)
      })
    }
  })
  return routes
}

const router = new VueRouter({
  routes: authToRoutes(),
  // mode: 'history',
  // base: __dirname,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
