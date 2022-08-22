<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <!-- 两个内容 -->
              <el-col :span="12">负责人</el-col>
              <el-col :span="12">
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 当el-row 放到其他标签中，宽度是通过内容撑开的 -->
        <el-tree :data="departs" :props="defaultProps">
          <template #default="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex">
                  <!-- 两个内容 -->
                  <el-col :span="12">{{ data.manager }}</el-col>
                  <el-col :span="12">
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>删除部门</el-dropdown-item>
                        <el-dropdown-item>修改部门</el-dropdown-item>
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments',
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

