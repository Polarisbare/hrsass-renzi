<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="loading">
        <el-tabs v-model="activeName">
          <!-- 左侧 -->
          <el-tab-pane label="角色管理" name="role">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="clickShowAdd"
            >新增角色</el-button>
            <el-dialog
              :title="showTitle"
              :visible="showDialog"
              :close-on-click-modal="false"
              @close="closeDialog"
            >
              <el-form
                ref="roleForm"
                :model="form"
                :rules="rules"
                label-width="100px"
              >
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述">
                  <el-input
                    v-model="form.description"
                    placeholder="请输入角色描述"
                  />
                </el-form-item>
              </el-form>

              <template #footer>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="addRole">确认</el-button>
              </template>
            </el-dialog>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column
                label="序号"
                width="100"
                type="index"
                :index="indexMethod"
              />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button size="small" type="success" @click="clickShowAssignDialog(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEdit(row.id)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRoleList(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="fy">
              <el-pagination
                :current-page="page"
                :page-sizes="[1, 2, 3, 4, 5]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="公司信息" name="company">
            <!-- 公司信息 -->
            <!-- 警告信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyForm.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 分配权限的弹层 -->
      <el-dialog
        title="分配权限"
        :visible="showAssignDialog"
        :close-on-click-modal="false"
        @close="closeAssignDialog"
        @open="openAssignDialog"
      >
        <el-tree
          :data="permissionData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          :show-checkbox="true"
          :check-strictly="true"
        />
        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeAssignDialog">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getPermissionListApi } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { mapState } from 'vuex'
import { getCompanyByIdApi } from '@/api/company'
import { getRoleListApi, delRoleListApi, addRoleApi, getRoleDetailApi, updateRoleApi } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      permissionData: [], // 存储权限数据
      roleId: '', // 记录正在操作的角色，
      showAssignDialog: false,
      list: [],
      total: 0, // 总条数
      pagesize: 4, // 每页条数
      page: 1, // 当前页
      loading: false,
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: ['blur', 'change']
          }
        ]
      },
      activeName: 'role',
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      }
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '修改角色' : '添加角色'
    },
    ...mapState('user', ['userInfo'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const { data } = await getRoleListApi(this.page, this.pagesize)
      // console.log(data)
      const { rows, total } = data
      this.list = rows
      this.total = total
      this.loading = false
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.page = 1
      // 调用方法, 重新请求
      this.getRoleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      // 调用方法, 重新请求
      this.getRoleList()
    },
    indexMethod(index) {
      return (this.page - 1) * this.pagesize + index + 1
    },
    delRoleList(id) {
      this.$confirm('确定要删除吗', '温馨提示')
        .then(async() => {
          await delRoleListApi(id)
          this.$message.success('恭喜删除成功')
          // 如果删除的页码部位1   并且只有一条输入  删除之后应该加载前一页数据
          if (this.page > 1 && this.list.length === 1) {
            this.page--
          }
          this.getRoleList()
        })
        .catch(() => {})
    },
    closeDialog() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
      this.form.description = ''
    },
    clickShowAdd() {
      this.showDialog = true
    },
    async addRole() {
      this.$refs.roleForm.validate(async flag => {
        if (!flag) return
        if (this.form.id) {
          await updateRoleApi(this.form)
          this.$message.success('恭喜修改成功')
        } else {
          await addRoleApi(this.form)
          this.$message.success('恭喜添加成功')
        }
        // 关闭弹窗
        this.closeDialog()
        // 重新渲染
        this.getRoleList()
      })
    },
    async showEdit(id) {
      const { data } = await getRoleDetailApi(id)
      // console.log(data)
      this.form = data
      this.showDialog = true
    },
    async getCompanyInfo() {
      const { data } = await getCompanyByIdApi(this.userInfo.companyId)
      // console.log(data)
      this.companyForm = data
    },
    /**
     * 关闭弹层
     */
    closeAssignDialog() {
      this.showAssignDialog = false
    },
    /**
     * 点击分配权限
     */
    async clickShowAssignDialog(id) {
      this.roleId = id
      this.showAssignDialog = true
      const { data } = await getPermissionListApi()
      // console.log(data)
      this.permissionData = transListToTreeData(data, '0')
      // console.log(this.permissionData)
    },
    openAssignDialog() {
      this.clickShowAssignDialog()
    }
  }

}
</script>

<style lang="scss" sacped>
.fy {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
