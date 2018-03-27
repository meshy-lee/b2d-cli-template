/*
  路由看项目及个人喜好进行拆分管理。
*/
import Vue from 'vue'
import Router from 'vue-router'
import indexView from '@/page/index_view'
import configManage from './config_manage/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'appLinkList'
      }
    }, {
      path: '/',
      name: 'indexView',
      component: indexView,
      children: [configManage]
    }
  ]
})
