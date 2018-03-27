import dropSelect from './src/index'

dropSelect.install = function (Vue) {
  Vue.component(dropSelect.name, dropSelect)
}

export default dropSelect
