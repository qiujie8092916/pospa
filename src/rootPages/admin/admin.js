import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../store/index'
import App from './admin.vue'
import router from '../../router/router.js'

import ElementUI from 'element-ui'
import '../../assets/css/variables.scss'

import '@/assets/css/theme.css'
import '@/assets/css/bootstrap.min.css'

Vue.use(ElementUI, {
  size: 'mini'
})

Vue.use(VueRouter)

const prod = process.env.NODE_ENV === 'development'
Vue.config.debug = prod
Vue.config.devtools = prod
Vue.config.productionTip = prod

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#admin')
