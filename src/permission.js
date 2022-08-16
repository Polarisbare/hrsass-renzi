// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // 白名单：不需要登录校验的路由，可以配置到白名单
// const whiteList = ['/login'] // no redirect whitelist

// // 全局前置首位
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   // 获取token  判断当前登录者有没有token
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       // 登录还想访问登录就强制返回首页
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         // 有token并且有用户信息  正常跳转
//         next()
//       } else {
//         // 有token 没有用户信息  token过期
//         try {
//           // 调用接口获取用户信息
//           await store.dispatch('user/getInfo')
//           // 只要获取到信息  就能跳转
//           next()
//         } catch (error) {
//           // 获取用户信息失败，调用服务端口。清楚token
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // 没登录访问白名单  indexOf  和  includes  你要跳转的页面在不在白名单里
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
