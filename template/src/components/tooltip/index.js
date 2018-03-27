import tips from './src/index'
tips.install = function (Vue) {
  Vue.component(tips.name, tips)
}

export default tips
