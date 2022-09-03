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
        store.dispatch('user/getUserInfo').then(async(res) => {
          // 在这里可以拿到用户权限
          // 拿到权限后可以动态新增路由-
          // console.log('wuudi', res)
          const { roles: { menus }} = res
          const otherRoutes = await store.dispatch('permission/filterRoutes', menus)
          // console.log('111', otherRoutes)

          router.addRoutes([
            ...otherRoutes,
            { path: '*', redirect: '/404', hidden: true }
          ])// 是异步方法不会阻碍后面代码执行 可以动态新增路由
          // 加参数之后next会进入一个死循环   直到路由添加成功之后才会放行  避免白屏 让用户重新进入一次页面
          next({
            ...to,
            replace: true// 告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
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
