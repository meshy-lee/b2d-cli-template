/* eslint-disable no-undef */
import axios from 'axios'
import moment from 'moment'

import loading from './loading/index' /* 表格加载动画 */
import tips from './tooltip/index' /* 提示 */
import pagination from './pagination/index' /* 分页 */
import {gtDatePick, gtTimePick, gtDatetimePick, gtDatetimeRange, gtDatetimeRangeSelect} from './datetime_pick/index' /* 时间选择器 */
import dropSelect from './drop_select/index' /* 模拟下拉框 */
import statisticTab from './statistic_tab/index'
import theBtn from './throttle_button/index' /* 节流按钮 */
const components = [
  tips,
  pagination,
  loading,
  gtDatePick,
  gtTimePick,
  gtDatetimePick,
  gtDatetimeRange,
  gtDatetimeRangeSelect,
  dropSelect,
  statisticTab,
  theBtn
]
const install = function (Vue, opts = {}) {
  if (install.installed) return

  components.map(component => {
    if (component.name) Vue.component(component.name, component)
    else Vue.use(component)
  })
  /* 百度埋点实例方法 */
  Vue.prototype.$anchor = function (type, params = []) { // type不重要
    /*
        category    必选  String  要监控的目标的类型名称 不填、填"-"的事件会被抛弃
        action  必选  String  用户跟网页进行交互的动作名称  不填、填"-"的事件会被抛弃
        opt_label   可选  String  事件的一些额外信息   不填、填"-"代表此项为空
        opt_value   可选  Number  跟事件相关的数值
    */
    if (window._hmt) {
      if (type === '_trackPageview') {
        _hmt.push(params)
      } else { // if else 执行代码一致，给特殊需求留位置。
        _hmt.push(params)
      }
    } else {
      console.warn('_htm is undefined!')
    }
  }
  /* 第三方库 */
  Object.defineProperty(Vue, 'http', { value: axios })
  Object.defineProperty(Vue.prototype, '$http', { value: axios })
  Object.defineProperty(Vue.prototype, '$moment', { value: moment })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  version: '1.0.0',
  install
}
