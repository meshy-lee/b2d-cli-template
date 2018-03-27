/*
本文件可以根据返回的权限数据gtAllSystemsData去拓展。
*/
import Vue from 'vue'
const getAuthList = () => {
  let result = []
  Vue.gtAllSystemsData.forEach((element, index) => {
    result.push({
      name: element.name,
      auth: element.sourceCode, // md5(element.path),
      sourceCode: element.sourceCode
    })
  })
  return result
}
const authMap = (userAuth) => {
  if (!userAuth) {
    return {}
  }
  let result = {}
  let authList = getAuthList()
  authList.forEach((element, index) => {
    userAuth.forEach((ele, index) => { // parent排除实际上只有3个
      if (ele === element.auth) {
        result[element.name] = true
      }
    })
  })
  return result
}
const sourceCodeMap = (userAuth) => {
  if (!userAuth) {
    return {}
  }
  const result = {}
  const authList = getAuthList()
  authList.forEach((element, index) => {
    userAuth.forEach((ele, index) => { // parent排除实际上只有3个
      if (ele === element.auth) {
        result[element.name] = {
          sourceCode: element.sourceCode
        }
      }
    })
  })
  return result
}

const sysNameMap = (name) => {
  let result
  Vue.gtAllSystemsData.forEach(element => {
    if (element.sourceCode && element.sourceCode === name) result = element.cName
  })
  return result
}

const install = function (Vue, opts = {}) {
  if (install.installed) return
  /* TODO：在获取产品权限相关应提供一个统一的接口。 */
  Object.defineProperty(Vue.prototype, 'authMap', {value: authMap})
  Object.defineProperty(Vue.prototype, 'sourceCodeMap', {value: sourceCodeMap})
  Object.defineProperty(Vue.prototype, 'sysNameMap', {value: sysNameMap})
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
