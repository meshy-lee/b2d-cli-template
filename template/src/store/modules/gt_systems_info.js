const gtSystemsInfo = {
  state: {
    systemsData: {}
  },
  mutations: {
    setSystemsData (state, data) {
      state.systemsData = data
    }
  },
  actions: {
    SET_SYS_DATA ({commit}, payload) {
      commit('setSystemsData', payload)
    }
  },
  getters: {
    getSystemData: state => {
      return [...state.systemsData]
    }
  }
}

export default gtSystemsInfo
