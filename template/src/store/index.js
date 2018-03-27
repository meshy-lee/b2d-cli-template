/* eslint-disable no-undef */
import Vuex from 'vuex'
// store到时候需要按照模块进行拆分
import userLoginInfo from './modules/user_login_info' // 用户信息相关
import menuStyle from './modules/menu_style' // 左侧菜单交互
import gtSystemsInfo from './modules/gt_systems_info' // 储存各个产品的基本信息

const store = new Vuex.Store({
  modules: {
    userLoginInfo,
    menuStyle,
    gtSystemsInfo
  }
})
export default store
