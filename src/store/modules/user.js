import { loginApi, getUserInfoApi } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken() || '',
  userInfo: {}
}

const mutations = { // 能改变state里面的值
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newToken) {
    state.userInfo = newToken
  }
}

const getters = { }

const actions = { // 放入异步操作
  login(context, data) {
    return new Promise((resolve, reject) => {
      loginApi(data).then(res => {
        const token = res.data
        context.commit('setToken', token)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo(context) {
    return new Promise((resolve, reject) => {
      getUserInfoApi().then(res => {
        // console.log(res)
        // const data = res.data
        const { data } = res
        context.commit('setUserInfo', data)
        resolve(res)// 把成功的信息返回出来
      }).catch((error) => {
        reject(error)
      })
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
