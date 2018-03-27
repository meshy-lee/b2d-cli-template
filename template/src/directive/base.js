import Vue from 'vue'

Vue.directive('hideFocus', { // 1、避免回车重复触发。2、消除focus样式。
  inserted: function (el, binding, vnode) {
    el.onfocus = () => {
      el.blur()
    }
  },
  unbind: function (el, binding, vnode) {
    el.onfocus = null
  }
})
