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
    <el-checkbox-group v-model="checkList">
      <!-- 选项 -->
      <!-- <el-checkbox label="110">管理员</el-checkbox> -->
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small" @click="closeEditDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getBaseUserInfoApi } from '@/api/user'
import { getRoleListApi } from '@/api/setting'
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
      roleList: []
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
      this.getRoleList()
      // this.getBaseUserInfo()
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
    }

  }
}
</script>
