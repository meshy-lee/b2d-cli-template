import configManageIndex from '@/page/config_manage/index'
import appLinkConfig from './app_link_config/index'

export default {
  path: '/configManage',
  name: 'configManage',
  component: configManageIndex,
  children: [appLinkConfig]
}
