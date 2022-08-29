<template>
  <div class="employees-detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="userInfo.username" placeholder="请输入姓名" style="width:300px" />
              </el-form-item>
              <el-form-item prop="newPassword" label="新密码:">
                <el-input v-model="userInfo.newPassword" placeholder="请输入新密码" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 内容 -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- 内容 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getBaseUserInfoApi } from '@/api/user'
import { saveUserDetailByIdApi } from '@/api/employees'
export default {
  name: 'EmployeesDetail',
  data() {
    return {
      userInfo: {
        id: '',
        username: '',
        newPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }
        ],
        newPassword: [
          { min: 6, max: 9, message: '密码必须是6-9位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getBaseUserInfo()
  },
  methods: {
    async getBaseUserInfo() {
      const { data } = await getBaseUserInfoApi(this.userId)
      //   console.log(res)
      this.userInfo.username = data.username
      this.userInfo.id = data.id
    },
    async saveUserDetailById() {
      this.$refs.userForm.validate(async ele => {
        if (!ele) return
        await saveUserDetailByIdApi({
          ...this.userInfo,
          password: this.userInfo.newPassword
        })
        this.$message.success('修改成功')
      })
    }
  }
}
</script>
