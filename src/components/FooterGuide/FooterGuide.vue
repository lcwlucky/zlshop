<template>
  <div>
    <div class="footer_guide">
      <a href="javascript:;" class="guide_item" :class="{on:'/home'===$route.path}" @click="goTo('/home')">
        <span class="item_icon">
          <i class="iconfont icon-waimai"></i>
        </span>
          <span>外卖</span>
      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
        <span class="item_icon">
          <i class="iconfont icon-sousuo"></i>
        </span>
          <span>搜索</span>
      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/order'===$route.path}" @click="goTo('/order')">
        <span class="item_icon">
          <i class="iconfont icon-dingdan"></i>
        </span>
          <span>订单</span>
      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/personal'===$route.path}" @click="goTo('/personal')">
        <span class="item_icon">
          <i class="iconfont icon-wode"></i>
        </span>
          <span>我的</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },

    methods:{
      goTo(path){
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl" /*引入混合*/
  .footer_guide //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex

    .guide_item
      display flex
      flex 1
      flex-direction column
      align-items center
      justify-content center
      margin 5px
      color #999999

      &.on
        color #02a774

      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px

        .iconfont
          font-size 22px
</style>
