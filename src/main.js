import Vue from 'vue'

// 重置默认样式 reset.css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// index .css 设置element-ui组件的样式
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import components from '@/components/index'// 引入全局注册的组件利用插件的方法
import request from '@/utils/request.js'

import * as directive from '@/directive/index'
// 引入过滤器
import * as filters from '@/filters'
// 1.利用for in
// for (const key in directive) {
//   Vue.directive(key, directive[key])
// }
// 2.利用Object[key]注册
Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})
// 批量注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// set ElementUI lang to EN
Vue.use(ElementUI)
Vue.use(components)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 一些警告在线上是关掉的
Vue.config.productionTip = false
// 构造函数的原型对象上挂载的方法和属性都可以被构造函数对应的实例所访问
// 只要是vue实例都可以访问$request
Vue.prototype.$request = request

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
