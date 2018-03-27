<template>
  <div class="config-manage-box">
    <div class='common-page-box'>
    <div class="unit-hat">
        <button type="button" class="gt-btn-line" @click='add'><i class="iconfont icon-plus"></i>{{btnOpt.btnText}}
        </button>
    </div>
    <div class="unit-header">
        <h2>APPLink配置</h2>
    </div>
    <div class="unit-neck clear">
        <gt-statistic-tab :tabList="tabList"></gt-statistic-tab>
    </div>
    <div class="unit-body">
      <router-view/>
    </div>
  </div>
  </div>
</template>

<script>
/* 简易示例！简易示例！简易示例！ */
import eventBus from '@/store/eventBus'
export default {
  name: 'serverConfigIndex',
  data () {
    return {
      btnOpt: {
        name: 'domainList',
        text: '域名列表',
        btnText: '新增域名'
      },
      tabList: [{
        name: 'domainList', // 对应上路由配置的name
        text: '域名列表',
        btnText: '新增域名'
      }]
    }
  },
  methods: {
    add () {
      eventBus.$emit('appLinkConfigAdd')
    },
    initBtn (newVal = this.$route) {
      this.btnOpt = this.tabList.filter(ele => ele.name === newVal.name)[0]
    }
  },
  watch: {
    $route (newVal, oldVal) {
      this.initBtn()
    }
  },
  created () {
    this.initBtn()
  }
}
</script>

<style lang='less' scoped>
.unit-neck{
  border-bottom: 1px solid #cccccc;
}
.common-page-box{
  position: relative;
  .unit-hat{
    position: absolute;
    right: 20px;
    top: 7px;
  }
}
</style>
<style lang='less'>
.config-manage-box .unit-body{
  margin-top: 20px;
  .unit-filter{
    border: none;
  }
}
</style>
