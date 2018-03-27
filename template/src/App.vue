<template>
  <div id="app" :class="{'primary-menu-open':primaryMenuStatus === 'open','primary-menu-close':primaryMenuStatus === 'close', 'minor-menu-open':minorMenuStatus === 'open','minor-menu-close':minorMenuStatus === 'close'}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    primaryMenuStatus () {
      return this.$store.getters.getPrimaryMenuStatus
    },
    minorMenuStatus () {
      return this.$store.getters.getMinorMenuStatus
    }
  },
  created () {
    this.$store.commit('setMinorMenuStatus', this.$store.getters.getLastMinorMenuStatus)
  }
}
</script>

<style lang='less'>
#app {
  height: 100%;
  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-content{
    min-width: 1000px;
    margin-left:332px;
    position: relative;
    top: 57px;
    padding: 20px;
    background: #f0f0f0;
    transition:margin .3s;
}

.primary-menu-open{
    .main-content {
        margin-left: 175px;
    }
}
.primary-menu-close{
    .main-content {
        margin-left: 58px;
    }
}
.minor-menu-open{
    .main-content {
        margin-left: 332px;
    }
}
.primary-menu-close.minor-menu-open {
    .main-content{
        margin-left: 215px;
    }
}
</style>
