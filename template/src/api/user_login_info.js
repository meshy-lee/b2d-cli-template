import Vue from 'vue'

export function getUserInfo () { // 获取用户信息
  return Vue.http.post('/gt_dev_center/account/getLoginInfo', {})
}

export function logout (type) { // 登出
  return Vue.http.post('/auth/user/logout', {})
}

export function gtDevCenterLogout (type) { // 登出
  return Vue.http.post('/gt_dev_center/account/logout', {})
}
