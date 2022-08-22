<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <trre-tools :node-data="company" />
        <!-- 当el-row 放到其他标签中，宽度是通过内容撑开的 -->
        <el-tree :data="departs" :props="defaultProps">
          <template #default="{data}">
            <trre-tools :node-data="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import trreTools from './components/tree-tools.vue'
export default {
  name: 'Departments',
  components: {
    trreTools
  },
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
</style>

