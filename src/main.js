import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import store from './store'
import filters from './lib/filters'
import {router} from './router/index'
import { Toast } from 'mint-ui'
import comp from './components'
import viewCommons from './views/commons'

/* 
  全局注册filter
 */
for (const key in filters) {
  if (filters.hasOwnProperty(key)) {
    Vue.filter(key, filters[key])
  }
}

comp(Vue);   //注册全局组件
viewCommons(Vue)  //业务型组件
Vue.http.options.root = '/ttx-manage/m';
Vue.prototype.DateFmt=DateFmt;
Vue.prototype.httpStatus=false;

// router.beforeEach((to, from, next) => {
//   // to 和 from 都是 路由信息对象
//   console.log('to:',this.httpStatus)
//   console.log('from:',from)
//   Vue.prototype.httpStatus = false
//   next()
// })


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,

})  