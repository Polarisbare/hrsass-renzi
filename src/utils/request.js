import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 作用创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
// Do something before request is sent
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

// 相应拦截器
service.interceptors.response.use(response => {
// Do something before response is sent
  // console.log('res', response)
  const res = response.data
  // console.log(res)
  if (!res.success) {
    Message.error(res.message)
    return Promise.reject(new Error(res.message))
  }
  return res
}, error => {
// Do something with response error
  // console.dir(error)
  const { response } = error
  if (response.status === 401 && response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
