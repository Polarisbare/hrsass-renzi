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
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small" @click="exportExle">excel导出</el-button>
          <el-button type="primary" size="small" @click="addEmpolyeeAdd">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 主体内容卡片 -->
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" width="100" :index="indexMethod" />
          <el-table-column label="头像" prop="timeOfEntry">
            <template #default="{ row }">
              <img v-imgerror="suitu" class="staff" :src="row.staffPhoto || defaultImage" alt="" @click="clickShowCodeDialog(row.staffPhoto)">
            </template>
          </el-table-column>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showEditRoleFn(row.id)">角色</el-button>
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
      <AssignRole :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
      <!-- 分享展示, 预览的二维码的弹层 -->
      <el-dialog width="300px" title="二维码" :visible="showCodeDialog" @close="closeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddEmployee from './components/add-employee.vue'
import enumObj from '@/constant/employees'
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
import { getFormateTime } from '@/filters/index'
import suitu from '@/assets/common/suitu.png'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
export default {
  name: 'Employees',
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      pageSize: 10, // 每页条数
      hireType: enumObj.hireType,
      showDialog: false,
      defaultImage: 'https://img2.baidu.com/it/u=2203692359,101708973&fm=253&fmt=auto&app=138&f=PNG?w=401&h=401',
      suitu,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: ''
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
    },
    // 导出
    async exportExle() {
      const headersArr = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const headersRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 先获取数据
      const { data: { rows }} = await getEmployeeListApi(1, this.total)
      // console.log(rows)
      const dataArr = this.formatJson(rows, headersArr, headersRelations)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: headersArr, // 表头 必填
          data: dataArr, // 具体数据 必填
          filename: '员工信息', // 导出表的名称
          autoWidth: true, // 宽度自适应
          bookType: 'xlsx' // 格式
        })
      })
    },
    // 返回出数组包数组的形式
    formatJson(rows, headersArr, headersRelations) {
      // [
      //   [ 值1, 值2, 值3, ... ]
      // ]
      const result = []
      rows.forEach(item => {
        const arr = []
        headersArr.forEach(key => {
          const ENKey = headersRelations[key]
          let value = item[ENKey]
          if (['timeOfEntry', 'correctionTime'].includes(ENKey)) {
            value = value ? getFormateTime(value) : ''
          }
          if (ENKey === 'formOfEmployment') {
            const obj = enumObj.hireType.find(obj => obj.id === value)
            value = obj ? obj.value : '未知'
          }
          arr.push(value)
        })
        result.push(arr)
      })
      // console.log(result)
      return result
    },
    // 点击出现弹框
    clickShowCodeDialog(url) {
      if (!url) return // 有图片才显示弹层
      this.showCodeDialog = true
      this.$nextTick(() => {
        // 如果这里 url 写的是网址, 就会跳转到对应网址 (二维码分享效果)
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    },
    closeDialog() {
      this.showCodeDialog = false
    },
    // 角色分配弹窗
    showEditRoleFn(id) {
      this.showRoleDialog = true
      this.userId = id
    }

  }
}
</script>

<style lang="scss" scoped>
.employees-container {
  .staff {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
}
</style>
