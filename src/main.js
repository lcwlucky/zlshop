/**
 * 入口js
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer' //加载mock
import VueLazyload from 'vue-lazyload' //图片懒加载库
import loading from './common/imgs/loading.gif'

import './filters' //加载过滤器

//注册全局mint-ui全局组件
Vue.component(Button.name, Button)
Vue.use(VueLazyload,{
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, //使用上vue-router
  store, // 使用上vuex
})
