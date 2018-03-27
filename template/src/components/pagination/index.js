import pagination from './src/index'

pagination.install = function (Vue) {
  Vue.component(pagination.name, pagination)
}

export default pagination
