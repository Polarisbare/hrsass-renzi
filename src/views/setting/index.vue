<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column label="序号" width="100" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="fy">
              <el-pagination
                :current-page="page"
                :page-sizes="[1, 2, 3, 4, 5]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleListApi } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      list: [],
      total: 0, // 总条数
      pagesize: 4, // 每页条数
      page: 1 // 当前页
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data } = await getRoleListApi(this.page, this.pagesize)
      // console.log(data)
      const { rows, total } = data
      this.list = rows
      this.total = total
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.page = 1
      // 调用方法, 重新请求
      this.getRoleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      // 调用方法, 重新请求
      this.getRoleList()
    }
  }
}
</script>

<style lang="scss" sacped>
  .fy{
    padding: 30px;
    display: flex;
    justify-content: flex-end;

  }
</style>
