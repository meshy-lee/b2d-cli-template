/*
*1、因为特殊性的缘故，本项目内不使用云组件的顶部栏和左侧菜单栏。使用通用组件项目的顶部栏和菜单栏。
*2、表单校验建议使用vee而不是云组件内的。对作者表示respect，但因为成熟度问题，不推荐在对外项目内使用。
*3、时间选择器因为UI样式原因没有引入使用，征求产品或各位大佬们的意见后再去用。而后记得移除项目内的时间选择器组件以减小打包体积。
*4、其余的按需引用。
*/
import Vue from 'vue'
import 'jnat-get-ui-core/dist/theme/default.css'
import 'jnat-get-ui-core/dist/theme/gt.css'
import './assets/style/getui_fixed.less' // 用于覆盖组件中的样式
import {
  gtModalConfirm,
  gtModalInfo,
  gtToast
} from 'jnat-get-ui-vue/dist/jnat3.full'
Vue.use(gtModalConfirm)
Vue.use(gtModalInfo)
Vue.use(gtToast)
