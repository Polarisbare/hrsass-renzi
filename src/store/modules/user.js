import { loginApi, getUserInfoApi, getBaseUserInfoApi } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'// 引入重置路由表
const state = {
  token: getToken() || '',
  userInfo: {}
}

const mutations = { // 能改变state里面的值
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  clearToken(state) {
    state.token = ''
    removeToken()
  },
  setUserInfo(state, newToken) {
    state.userInfo = newToken
  },
  clearUserInfo(state) {
    state.userInfo = {}
  }
}

const getters = { }

const actions = { // 放入异步操作
  // login(context, data) {
  //   return new Promise((resolve, reject) => {
  //     loginApi(data).then(res => {
  //       const token = res.data
  //       context.commit('setToken', token)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  async login(context, data) {
    const res = await loginApi(data)
    const token = res.data
    context.commit('setToken', token)
    return res
  },
  // getUserInfo(context) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfoApi().then(res => {
  //       // console.log(res)
  //       // const data = res.data
  //       const { data } = res
  //       context.commit('setUserInfo', data)
  //       resolve(res)// 把成功的信息返回出来
  //     }).catch((error) => {
  //       reject(error)
  //     })
  //   })
  // }
  async getUserInfo({ commit }) {
    const { data } = await getUserInfoApi()
    // console.log(data)
    const { data: data2 } = await getBaseUserInfoApi(data.userId)
    // console.log('wudi', data2)
    // 创建一个新对象用于合并
    const baseDate = {
      ...data,
      ...data2
    }
    console.log(baseDate)
    commit('setUserInfo', baseDate)

    return baseDate
  },
  logout({ commit }) {
    // 清除token
    commit('clearToken')
    // 清除用户信息
    commit('clearUserInfo')
    // 清除router里面的路由表单
    resetRouter()
    // 清除vuex中的路由表
    commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
