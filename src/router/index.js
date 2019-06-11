import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/Home/Home') //路由懒加载
// import Home from '../pages/Home/Home'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Personal from '../pages/Personal/Personal'
import Login from '../pages/Login/Login'

import Shop from '../pages/Shop/Shop'
import ShopComment from '../pages/Shop/ShopComment'
import ShopGoods from '../pages/Shop/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo'

Vue.use(Router)

export default new Router({
  routes: [
    //默认显示首页
    {
      path: '/',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    }, {
      path: '/shop',
      component: Shop,
      children:[
        {
          path:'',
          redirect:'/shop/goods'
        },
        {
          path: '/shop/comment',
          component: ShopComment,
        },{
          path: '/shop/goods',
          component: ShopGoods,
        },{
          path: '/shop/info',
          component: ShopInfo,
        },
      ]
    },

  ]
})
