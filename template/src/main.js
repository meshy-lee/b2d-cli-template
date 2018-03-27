/*
https://github.com/vuejs/vuex/issues/480
项目本身要求支持IE9以上。因为开发模式的问题无法进行调试，所以应与产品协商放弃对IE9、IE10的支持。
*/
import 'babel-polyfill' // IE兼容性垫片

/*
项目基本技术栈 vue、vuex、vue-router、vee、axios。
老项目因为历史缘故仍旧使用vue-resource，本身使用无碍。有时间可以替换成axios。

代码检查:eslint standard
开发者中心等稍微老一点的是沿用云组件3.0的书写形式，但是新项目建议使用eslint standard。
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'

import devAuth from './components/dev_auth' // 顶部栏权限相关
import Public from './components/setup' // 自定义的通用组件；
import Store from './store/index' // 应用内的仓库
/* 云组件及样式覆盖 */
import './getui_entry'
import './assets/style/index.less' // 项目基本的样式
import './assets/style/common.less' // 项目内的自定义通用样式
/* 云组件及样式覆盖 end */

import './api/inteceptor' // 拦截器
import './components/validate_rule' // vee校验规则
import './directive/base'

Vue.use(devAuth)
Vue.use(Public)
Vue.use(VeeValidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store: Store
})
