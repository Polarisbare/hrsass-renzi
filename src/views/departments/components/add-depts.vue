<template>
  <el-dialog
    title="添加部门"
    :visible="showDialog"
    @close="closeDialog"
  >

    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialogFn', false)
    }
  }
}
</script>

<style>

</style>
