import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'// 引入进度条
import 'nprogress/nprogress.css'

// 前置守卫
const writeList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 获取用户信息    Object.keys检查对象里面所有的key值
      if (Object.keys(store.state.user.userInfo).length <= 0) {
        store.dispatch('user/getUserInfo').then(() => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 后置守卫
router.afterEach((to, from) => {
  NProgress.done()
})
