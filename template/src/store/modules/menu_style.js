import eventBus from '@/store/eventBus.js'
const menuStyle = { // 此处记录了菜单的样式//方法能公用，调用之后模块的值都会改变，唯一不能公用的是getters 因为是模块
  state: {
    primaryMenuOpen: 'init',
    minorMenuOpen: 'init', // init为尚未初始化 open展开， close收起。
    lastMinorMenuStatus: 'open' // 最后一次菜单状态，默认展开状态
  },
  mutations: {
    setPrimaryMenuStatus (state, val) {
      state.primaryMenuOpen = val
      eventBus.$emit('chartResize')
    },
    setMinorMenuStatus (state, val) {
      state.minorMenuOpen = val
      if (val === 'open' || val === 'close') { // 记录最后一次状态
        state.lastMinorMenuStatus = val
      }
      eventBus.$emit('chartResize')
    }
  },
  getters: {
    getPrimaryMenuStatus: state => state.primaryMenuOpen,
    getMinorMenuStatus: state => state.minorMenuOpen,
    getLastMinorMenuStatus: state => state.lastMinorMenuStatus
  }
}

export default menuStyle
