// 废弃
const app = {
  state: {
    showToast: {
      alerts: false,
      type: 'success',
      text: 'I am a alert'
    }
  },
  mutations: {
    SHOW_TOAST: (state, options) => {
      state.showToast = options
    }
  },
  actions: {
    showToast({ commit }, options) {
      commit('SHOW_TOAST', options)
    }
  }
}

export default app
