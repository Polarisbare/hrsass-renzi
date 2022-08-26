<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <!-- 左侧插槽 -->
        <template #left>
          <span>总记录数: 16 条</span>
        </template>
        <!-- 右侧插槽 -->
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 主体内容卡片 -->
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" width="100" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeListApi } from '@/api/employees'
export default {
  name: 'Employees',
  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      pageSize: 10 // 每页条数
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { data: { rows, total }} = await getEmployeeListApi(this.page, this.pageSize)
      this.list = rows
      this.total = total
      console.log(this.list)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getEmployeeList()
    },
    indexMethod(index) {
      return (this.page - 1) * this.pageSize + index + 1
    }
  }
}
</script>

<style>

</style>
