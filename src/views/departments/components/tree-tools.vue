<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除部门</el-dropdown-item>
              <el-dropdown-item>修改部门</el-dropdown-item>
              <el-dropdown-item>添加子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    nodeData: {
      require: true, // 必填项
      type: Object,
      default: () => {} // 默认导出
    }
  }
}
</script>

<style>

</style>
