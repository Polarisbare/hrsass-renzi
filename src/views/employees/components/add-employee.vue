<template>
  <!-- @open="showDepartmentsList" -->
  <el-dialog title="新增员工" :visible="showDialog" :close-on-click-modal="false" @close="closeDialog" @click.native="hideDeptsList">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @click.native.stop="getDepartmentsList" />
        <el-tree v-if="showTree" v-loading="isloading" :data="list" :props="{label:'name'}" @node-click="handleNodeClick" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentsListApi } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      list: [],
      showTree: false,
      isloading: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
    },
    async getDepartmentsList() {
      // 点击显示 再次点击隐藏
      this.showTree = !this.showTree
      this.isloading = true
      const { data } = await getDepartmentsListApi()
      //   console.log(res)
      this.list = transListToTreeData(data.depts, '')
      this.isloading = false
      // console.log(this.list)
    },
    showDepartmentsList() {
      this.getDepartmentsList()
    },
    handleNodeClick(data) {
      // console.log(data)
      if (data.children && data.children.length > 0) {
        return
      }
      this.formData.departmentName = data.name
      this.showTree = false
    },
    hideDeptsList() {
      this.showTree = false
    }

  }
}
</script>

<style>

</style>
