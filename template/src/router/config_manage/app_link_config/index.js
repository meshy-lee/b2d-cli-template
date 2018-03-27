const appLinkConfig = () => import(/* webpackChunkName: "appLinkConfig" */ '@/page/config_manage/app_link_config')

const domainList = () => import(/* webpackChunkName: "appLinkConfig" */ '@/page/config_manage/app_link_config/domain_list/index')
export default {
  path: '/appLinkConfig',
  name: 'appLinkConfig',
  component: appLinkConfig,
  redirect: {
    name: 'appLinkList'
  },
  children: [{
    path: '/appLinkConfig/domainList',
    name: 'domainList',
    component: domainList,
    meta: {
      itemName: 'appLinkConfig'
    }
  }]
}
