import Vue from 'vue'

// 重置默认样式 reset.css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// index .css 设置element-ui组件的样式
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import request from '@/utils/request.js'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 一些警告在线上是关掉的
Vue.config.productionTip = false
// 构造函数的原型对象上挂载的方法和属性都可以被构造函数对应的实例所访问
// 只要是vue实例都可以访问$request
Vue.prototype.$request = request

Vue.directive('imgerror', {
  // 当时用了这个自定义指令的标签被渲染的时候会执行inserted钩子函数
  // el  表示的时试试用这个指令的标签
  // binding：使用指令的时候传过来的标签
  inserted(el, binding) {
    // img 标签有一个onerror事件，当图片加载失败的时候
    el.onerror = function() {
      // 执行的话说明失败
      el.src = binding.value
    }
  }
})
Vue.directive('color', {
  inserted(el, binding) {
    el.style.color = binding.value
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
