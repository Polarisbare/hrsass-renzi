// 组织架构模块
import Layout from '@/layout'

export default {
  path: '/permissions',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index'),

      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
