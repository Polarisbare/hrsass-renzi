// mixins中的js文件可以声明和vue一样的内容
// 如果想在组件中使用mixins中选项 可以使用mixins混入
// 1. 如果组件钟大哥mixins中有相同的声明生命周期，不会覆盖，会合并到一个数组一起执行，先执行mixins中的钩子后执行组件中的
// 2. 如果组件中的data methods，computed watch 这些配置如果和mixins中的陪孩子同名，会产生覆盖，以组件为准
// 缺点：来源不明确     方法: 先导入mixins的js文件  在声明一个数组  再混入mixins:[js文件]
export default {
  methods: {
    // 判断用户是否有二级权限
    // 判断是否有二级权限
    checkPermission(permission) {
      return this.roles?.points?.includes(permission)
    }

  }
}
