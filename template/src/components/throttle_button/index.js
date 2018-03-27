import theBtn from './src/index'
theBtn.install = function (Vue) {
  Vue.component(theBtn.name, theBtn)
}

export default theBtn
