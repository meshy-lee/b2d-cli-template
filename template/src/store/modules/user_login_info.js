// userInfo 此处保存最顶层的用户数据 包括权限
// import Vue from 'vue'
import * as api from '@/api/user_login_info'
const userLoginInfo = {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {
    GET_USER_INFO ({commit, state, dispatch}) {
      api.getUserInfo().then(res => {
        commit('setUserInfo', res.data.data.data)
      })
    },
    LOGOUT ({commit, state}) { // 再见，客户'爸爸'
      const cb = () => {
        window.localStorage.setItem('userIsLogin', false) // 只要在登录界面，默认用户是登出状态
        window.location.href = '../dev/#/login'
      }
      api.logout().then(res => {
        api.gtDevCenterLogout().then(res => {
          cb()
        }, errRes => {
          cb()
        })
      }, res => { // 错误响应
        cb()
      })
    }
  },
  getters: {
    getUserLoginInfo: state => state.userInfo,
    getProductAuth: state => state.userInfo.privileges
  }
}

export default userLoginInfo
