<!--商品显示的路由-->
<template>
  <div>
    <div class="goods">
      <!--左边菜单-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current:index===currentIndex}"
            @click="clickMenuItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
          </li>
        </ul>
      </div>
      <!--右边食物列表-->
      <div class="foods-wrapper">
        <ul ref="foodsWarpperUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
                @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Food ref="sfood" :food="food"/>
    </div>
    <ShopCar/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../components/CartControl/CartControl'
  import Food from '../../components/Food/Food'
  import ShopCar from '../../components/ShopCar/ShopCar'

  export default {
    data() {
      return {
        scrollY: 0, //右侧 Y 轴滑动的坐标
        tops: [], // 包含右侧所有分类小列表的 top 值
        food:{}  //点击商品显示大图和信息的food
      }
    },
    mounted() {
      // 使用 axios 请求 mockjs 提供的接口
      this.$store.dispatch('getShopGoods', () => {// goods 更新了, 界面还没有更新
        this.$nextTick(() => {
          //初始化滚动条
          this._initScroll()
          this._initTops()
        })
      })
    },

    methods: {
      //初始化滚动条
      _initScroll() {
        //左侧
        new BScroll('.menu-wrapper', {
          click:true
        })
        //右侧
        this.foodScroll = new BScroll('.foods-wrapper', {
          probeType: 2, //因为惯性滑动并不会触发
          click:true
        })

        //给右侧滑动添加监听
        this.foodScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y);
        })

        this.foodScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y);
        })
      },
      //初始化各个Food li的top值
      _initTops() {
        const tops = []
        let top = 0
        // 计算各个 top, 并保存到 tops
        tops.push(top)
        // 得到 ul 下所有的子 li
        const lis = this.$refs.foodsWarpperUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach((li, index) => {
          top += li.clientHeight
          tops.push(top)
        })
        // Array.from(lis).forEach()  ES6语法直接转化为数组
        // 保存 tops
        this.tops = tops
      },

      clickMenuItem(index){
        const scrollY = this.tops[index]
        this.scrollY = scrollY  //立即更新当前的scrollY，如果不更新，会等下面一条语句执行后才能更新左边的currentIndex
        this.foodScroll.scrollTo(0,-scrollY,500)
      },

      // 显示点击的food
      showFood(food){
        this.food = food
        // 显示food组件 (在父组件中调用子组件对象的方法)
        //调用子组件内部的方法，先用ref属性标识该组件，之后可以通过$refs找到该组件并且调用其内部方法
        this.$refs.sfood.toggleShow()
      }
    },

    computed: {
      ...mapState(['goods']),

      currentIndex() { //当前左边菜单停留的下标
        const {tops, scrollY} = this
        return tops.findIndex((top, index) => {
          return this.scrollY >= top && scrollY < tops[index + 1]
        })

        // 或者
        /*let index = 0;
        for (let i = 0; i < tops.length; i++) {
          if (i !== tops.length - 1) {
            if (scrollY >= tops[i] && scrollY < tops[i + 1]) {
              index = i;
              break;
            }

          } else {
            index = tops.length
          }
        }
        return index*/
      }
    },

    components:{
      CartControl,
      Food,
      ShopCar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #fff

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          background: #f3f5f7
          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
