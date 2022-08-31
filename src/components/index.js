// 全局注册插槽公共使用
// import Vue from 'vue'
import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
// Vue.component('PageTools', PageTools)
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
  }
}