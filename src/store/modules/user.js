import { loginApi } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken() || ''
}

const mutations = { // 能改变state里面的值
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  }
}

const getters = { }

const actions = { // 放入异步操作
  login(context, data) {
    loginApi(data).then(res => {
      const token = res.data.data
      context.commit('setToken', token)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
