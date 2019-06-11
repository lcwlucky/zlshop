<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

    <footer-guide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  export default {
    mounted () {
      // this.$store.dispatch('getAddress')
      this.getAddress()//获取地址
      // this.getUserInfo()
    },
    components:{
      FooterGuide
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
