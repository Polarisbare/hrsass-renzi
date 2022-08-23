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
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="emit">修改部门</el-dropdown-item>
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentApi } from '@/api/departments.js'
export default {
  props: {
    nodeData: {
      require: true, // 必填项
      type: Object,
      default: () => {} // 默认导出
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      // console.log(command)
      if (command === 'del') {
        // console.log('点击删除')
        this.$confirm('确定删除吗', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delDepartmentApi(this.nodeData.id)
          this.$message.success('删除成功')
          this.$emit('del-depts', this.nodeData)
        }).catch(() => {})
        // delDepartmentApi(this.nodeData.id){
        //   this.$emit('del-depts')
        // }
      }
      if (command === 'add') {
        // console.log('点击添加')
        // 点击添加出现模态框
        this.$emit('add-depts', this.nodeData)
      }
      if (command === 'emit') {
        console.log('点击编辑')
      }
    }
  }
}
</script>

<style>

</style>
