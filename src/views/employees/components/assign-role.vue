<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showRoleDialog"
    :close-on-click-modal="false"
    @close="closeEditDialog"
    @open="openEditDialog"
  >
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="isloading">
      <!-- 选项 -->
      <!-- <el-checkbox label="110">管理员</el-checkbox> -->
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="getEmployeeRole">确定</el-button>
      <el-button size="small" @click="closeEditDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getBaseUserInfoApi } from '@/api/user'
import { getRoleListApi } from '@/api/setting'
import { getEmployeeRoleApi } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      isloading: false
    }
  },
  methods: {
    /**
     * 关闭模态框
     */

    closeEditDialog() {
      this.$emit('update:showRoleDialog', false)
    },
    /** 打开模态框
     *
     */
    openEditDialog() {
      this.isloading = true
      this.getRoleList()
      this.getBaseUserInfo()
      Promise.all([this.getRoleList(), this.getBaseUserInfo()]).then(() => {
        this.isloading = false
      })
    },
    async getRoleList() {
      const { data } = await getRoleListApi(1, 66666)
      // console.log('wudi', data)/
      this.roleList = data.rows
    },
    async getBaseUserInfo() {
      const { data: { roleIds }} = await getBaseUserInfoApi(this.userId)
      // console.log(res)
      this.checkList = roleIds
    },
    async getEmployeeRole() {
      const data = { id: this.userId, roleIds: this.checkList }
      await getEmployeeRoleApi(data)
      this.closeEditDialog()
    }

  }
}
</script>
