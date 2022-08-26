<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <!-- 左侧插槽 -->
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <!-- 右侧插槽 -->
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="addEmpolyeeAdd">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 主体内容卡片 -->
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" width="100" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="getStaffCondition" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template #default="{row}">
              {{ row.timeOfEntry | getFormateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
      <AddEmployee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import AddEmployee from './components/add-employee.vue'
import enumObj from '@/constant/employees'
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
export default {
  name: 'Employees',
  components: {
    AddEmployee
  },
  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      pageSize: 10, // 每页条数
      hireType: enumObj.hireType,
      showDialog: false
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
      // console.log(this.list)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getEmployeeList()
    },
    indexMethod(index) {
      return (this.page - 1) * this.pageSize + index + 1
    },
    getStaffCondition(row, column, cellValue, index) {
      const obj = this.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除
    delEmployee(id) {
      this.$confirm('亲真的要删除吗', '温馨提示').then(async() => {
        await delEmployeeApi(id)
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.$message.success('删除成功')
        this.getEmployeeList()
      }).catch(() => {})
    },
    // 添加
    addEmpolyeeAdd() {
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
