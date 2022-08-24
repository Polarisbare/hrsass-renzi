<template>
  <el-dialog
    title="添加部门"
    :visible="showDialog"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <!-- 表单元素 el-form  el-selet -->
    <el-form ref="addform" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in employeesList"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="small" @click="submitDepts">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSimpleUserListApi } from '@/api/employees'
import { addDepartmentApi } from '@/api/departments'
export default {
  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      default: () => {}
    },
    departsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', tiigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '部门名称要求1-10字符', tiigger: ['blur', 'change'] },
          { validator: this.validatDeptNameIsRepeat, tiigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', tiigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '部门编码要求1-10字符', tiigger: ['blur', 'change'] },
          { validator: this.validatDeptCodeIsRepeat, tiigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门管理者不能为空', tiigger: ['change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', tiigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300字符', tiigger: ['blur', 'change'] }
        ]
      },
      employeesList: []

    }
  },
  //   created() {
  //     console.log(this.nodeData)
  //   },
  methods: {
    closeDialog() {
      this.$emit('closeDialogFn', false)
    },
    // 三个参数  rule value callback
    validatDeptNameIsRepeat(rule, value, callback) {
    // 校验当前部门的子部门和你输入的内容是否一样===
    // 当前部门的信息存在nodeData
    // 先把nodeData信息接收过来，在接收一份全部数组departsList
      const children = this.departsList.filter(item => item.pid === this.nodeData.id)
      //   console.log(this.nodeData)v
      const isRepeat = children.some(item => item.name === value)
      isRepeat ? callback(new Error('当前部门已存在')) : callback()
    },
    validatDeptCodeIsRepeat(rule, value, callback) {
      const isRepeat = this.departsList.some(item => item.code === value)
      isRepeat ? callback(new Error('当前编码已存在')) : callback()
    },
    async getSimpleUserList() {
      const { data } = await getSimpleUserListApi()
      // console.log(res)
      this.employeesList = data
      console.log(data)
    },
    // openDialog() {
    //   this.getSimpleUserList()
    // }
    submitDepts() {
      this.$refs.addform.validate(async falg => {
        // console.log(falg)
        if (!falg) return
        await addDepartmentApi({ ...this.form, pid: this.nodeData.id })
        this.$message.success('恭喜添加成功')
        // console.log(res)
        // 关闭弹框
        this.closeDialog()
        // 清空表单
        this.$emit('add-depts-success')
      })
    }
  }
}
</script>

<style>

</style>
