/* 二级菜单基本使用方法如下。其余拓展配置项请查询jnat-dev-center-group的使用说明.md */
const menuItems = [
  {
    label: '配置管理',
    name: 'serverDetails',
    items: [
      {
        label: 'APPLink配置',
        name: 'domainList'
      }
    ]
  }
]

export default menuItems
