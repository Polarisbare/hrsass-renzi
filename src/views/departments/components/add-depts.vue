<template>
  <el-dialog
    :title="showTitle"
    :visible="showDialog"
    :close-on-click-modal="false"
    @close="closeDialog"
    @open="openDialog"
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
      <el-button size="small" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSimpleUserListApi } from '@/api/employees'
import { addDepartmentApi, getDepartmentDetailApi, editDepartmentApi } from '@/api/departments'
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
      // showTitle: '',
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
  computed: {
    showTitle() {
      return this.form.id ? '修改部门' : '添加子部门'
    }
  },
  //   created() {
  //     console.log(this.nodeData)
  //   },
  methods: {
    closeDialog() {
      // this.$emit('closeDialogFn', false)
      // 子组件必须通过固定语法去修改父组件的数据
      // 语法：this.$emit('update:prop传来的参数'，你要修改的值)
      this.$emit('update:showDialog', false)
      this.$refs.addform.resetFields()
      this.form = {
        form: {
          name: '', // 部门名称
          code: '', // 部门编码
          manager: '', // 部门管理者
          introduce: '' // 部门介绍
        }
      }
    },
    // 三个参数  rule value callback
    validatDeptNameIsRepeat(rule, value, callback) {
      let children = []
      // 校验当前部门的子部门和你输入的内容是否一样===
      // 当前部门的信息存在nodeData
      // 先把nodeData信息接收过来，在接收一份全部数组departsList
      //   console.log(this.nodeData)v
      // 修改 逻辑
      if (this.form.id) {
        // 先判断输入的内容是否跟我原来的一样
        if (value === this.nodeData.name) {
          callback()
          return
        }
        // 如果输入的内容不一样，则比较输入内容和其他兄弟节点进行对比
        // 1.先找到兄弟节点
        children = this.departsList.filter(item => item.pid === this.nodeData.pid) || []
        // 从兄弟节点中找到每一样  跟我输入内容进行对比
      } else {
        // 校验   判断当前部门里的子部门  是否跟你输入的内容一样
        // 当前部门的信息 存在了nodeData中
        // 1.先获取所有部门数据departsList
        children = this.departsList.filter(item => item.pid === this.nodeData.id)
      }
      const isRepeat = children.some(item => item.name === value)
      isRepeat ? callback(new Error('当前部门已存在')) : callback()
    },
    validatDeptCodeIsRepeat(rule, value, callback) {
      if (this.form.id && this.nodeData.code === value) {
        callback()
        return
      }
      const isRepeat = this.departsList.some(item => item.code === value)
      isRepeat ? callback(new Error('当前编码已存在')) : callback()
    },
    async getSimpleUserList() {
      const { data } = await getSimpleUserListApi()
      // console.log(res)
      this.employeesList = data
      // console.log(data)
    },
    openDialog() {
      this.getSimpleUserList()
    },
    submitDepts() {
      this.$refs.addform.validate(async falg => {
        // console.log(falg)
        if (!falg) return
        if (this.form.id) {
          // 修改
          await editDepartmentApi(this.form)
          this.$message.success('恭喜修改成功')
        } else {
          await addDepartmentApi({ ...this.form, pid: this.nodeData.id })
          this.$message.success('恭喜添加成功')
        }
        // console.log(res)
        // 关闭弹框
        this.closeDialog()
        // 清空表单
        this.$emit('add-depts-success')
      })
    },
    async getDepartmentDetail() {
      const { data } = await getDepartmentDetailApi(this.nodeData.id)
      // console.log(res)
      this.form = data
    }
  }
}
</script>

<style>

</style>
