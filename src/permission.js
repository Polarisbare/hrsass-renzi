import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'// 引入进度条
import 'nprogress/nprogress.css'
import { asyncRoutes } from '@/router/index.js'

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
          // 在这里可以拿到用户权限
          // 拿到权限后可以动态新增路由-
          router.addRoutes(asyncRoutes)// 是异步方法不会阻碍后面代码执行 可以动态新增路由
          next({
            ...to,
            replace: true
          })
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
