<template>
  <div class="page-container">
    <gt-top-bar :system="'dos'" :switchBtn='false' :showProductList='false' :showSyetemName='true'></gt-top-bar>
    <gt-primary-menu currentSystem="dos"></gt-primary-menu>
    <gt-minor-menu title='' :menus='menus'></gt-minor-menu>
    <div class="main-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuItems from '@/config/menu_item'
export default {
  name: 'indexView',
  data () {
    return {

    }
  },
  computed: {
    menus () {
      return [...menuItems]
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next() // 无后端服务测试用
  }
}
</script>

<style lang='less'>
.page-container {
  position: relative;
  bottom: 0;
  top: 0;
}
</style>
