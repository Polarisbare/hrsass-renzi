<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <!-- 左侧插槽 -->
        <template #left>
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <!-- 右侧插槽 -->
        <template #right>
          <el-button type="primary" size="small">历史归档</el-button>
          <el-button type="primary" size="small">导出</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employees'
}
</script>

<style>

</style>
