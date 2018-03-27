import gtLoading from './src/index'

gtLoading.install = function (Vue) {
  Vue.component(gtLoading.name, gtLoading)
}

export default gtLoading
