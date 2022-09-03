export const imgerror = {
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
}
export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
import store from '@/store'
export const permission = {
  inserted(el, binding) {
    const roles = store.getters.roles
    if (!roles?.points?.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
}
