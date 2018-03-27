/* eslint-disable no-mixed-operators */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 对响应错误做点什么
  const statusMap = {
    '400': '参数错误',
    '401': '未登录或授权信息过期，请重新登录',
    '404': '请求地址无效',
    '500': '服务器错误',
    '502': '服务器错误',
    '504': '请求超时'
  }
  const status = err.response.status
  if (status === 401) store.dispatch('LOGOUT')
  const msg = statusMap[status] || '未知错误'
  Vue.$toast({
    type: 'toast-error',
    message: msg
  })
  return Promise.reject(err)
})

// 业务 框架错误处理
axios.interceptors.response.use(function (res) {
  let resData = res.data
  const statusMap = {}
  let status = resData.result || (resData.data && resData.data.result) || resData.errorNo
  if (status) {
    Vue.$toast({
      type: 'toast-error',
      message: statusMap[status] || resData.errInfo || resData.errorMsg || '请求失败'
    })
    return Promise.reject(res)
  }
  return res
}, function (error) {
  return Promise.reject(error)
})
