// 全局注册插槽公共使用
// import Vue from 'vue'
import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
