<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <trre-tools :node-data="company" :is-root="true" />
        <!-- 当el-row 放到其他标签中，宽度是通过内容撑开的 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <template #default="{data}">
            <trre-tools :node-data="data" @del-depts="getDepartmentsList" />
          </template>
        </el-tree>
      </el-card>
      <add-depts :show-dialog="showDialog" @closeDialogFn="closeDialog" />
    </div>
  </div>
</template>
<script>
import trreTools from './components/tree-tools.vue'
import addDepts from './components/add-depts.vue'
import { getDepartmentsListApi } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Departments',
  components: {
    trreTools,
    addDepts
  },
  data() {
    return {
      departs: [],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      showDialog: true
    }
  },
  created() {
    this.getDepartmentsList()
  },
  methods: {
    async getDepartmentsList() {
      const { data } = await getDepartmentsListApi()
      this.company.name = data.companyName
      this.departs = transListToTreeData(data.depts, '')
      // console.log(data)
    },
    //   transListToTreeData(list, searchVal) {
    //   //   // console.log(list)
    //   //   // 先找父级加入一个数组  父级的pid都是‘’
    //   //   const arr = []
    //   //   list.forEach(item => {
    //   //     if (item.pid === searchVal) {
    //   //       arr.push(item)
    //   //     }
    //   //   })
    //   //   // console.log(arr)
    //   //   // 找到子集的数组
    //   //   arr.forEach(item => {
    //   //     const children = list.filter(obj => obj.pid === item.id)
    //   //     item.children = children
    //   //   })
    //   //   return arr
    //   // }
    // transListToTreeData(list, searchVal) {
    // // 先找父级
    //   const arr = []
    //   list.forEach(item => {
    //     if (item.pid === searchVal) {
    //       const children = this.transListToTreeData(list, item.id) || []
    //       item.children = children
    //       arr.push(item)
    //     }
    //   })
    //   return arr
    // }
    closeDialog() {
      // console.log(val)
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>

