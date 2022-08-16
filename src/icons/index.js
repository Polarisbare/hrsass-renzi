import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context 有三个参数
// 1.要查找的路径、
// 2.是否查找子目录
// 3.表示查找那些文件  正则表达式   /\.js/
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
