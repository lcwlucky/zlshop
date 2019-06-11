/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_COMMENTS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },

  [RESET_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [RECEIVE_COMMENTS](state, {comments}) {
    state.comments = comments
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (!food.count) { // 第一次增加
      // food.count = 1  // 新增属性(没有数据绑定) 页面不会显示
      /*
      对象
      属性名
      属性值
       */
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {// 只有有值才去减
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    //先把之前选择食品的数量置0
    state.cartFoods.forEach((item) => {
      item.count = 0;
    })
    //清空购物车列表
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },

}
