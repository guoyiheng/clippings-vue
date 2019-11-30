import { login, regist } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : 'Your Kindle Clippings'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_INFO', data.userInfo)

          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user regist
  regist({ commit }, userInfo) {
    userInfo.name = userInfo.name.trim()
    userInfo.email = userInfo.email.trim()

    return new Promise((resolve, reject) => {
      regist(userInfo)
        .then(response => {
          //   const { data } = response
          //   commit('SET_TOKEN', data.token)
          //   commit('SET_INFO', data.userInfo)

          //   setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user userInfo
  //   getInfo({ commit }, params) {
  //     console.log(params)

  //     return new Promise((resolve, reject) => {
  //       getInfo(params.id)
  //         .then(response => {
  //           const { data } = response

  //           if (!data) {
  //             reject('Verification failed, please Login again.')
  //           }

  //           commit('SET_INFO', data)
  //           resolve(data)
  //         })
  //         .catch(error => {
  //           reject(error)
  //         })
  //     })
  //   },

  // user logout
  //   logout({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       logout(state.token)
  //         .then(() => {
  //           commit('SET_TOKEN', '')
  //           removeToken()
  //           resolve()
  //         })
  //         .catch(error => {
  //           reject(error)
  //         })
  //     })
  //   },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_INFO', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
