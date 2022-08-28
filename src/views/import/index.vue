<template>
  <div>
    <UploadExcel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { batchAddEmployeeApi } from '@/api/employees'
export default {
  name: 'Import',
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    // 考勤  工资  可复用
    handleSuccess({ results, header }) {
      // console.log(results)
      // console.log(this.type)
      if (this.type === 'user') {
        this.batchAddEmployee(results)
      }
    },
    async batchAddEmployee(results) {
      // console.log(results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const list = []
      results.forEach(item => {
        const obj = {}
        for (const key in item) {
          const ENkey = userRelations[key] // 里面有值
          if (['timeOfEntry', 'correctionTime'].includes(ENkey)) {
            obj[ENkey] = this.formatExcelDate(item[key], '-')
          } else {
            obj[ENkey] = item[key]
          }
        }
        list.push(obj)
      })
      await batchAddEmployeeApi(list)
      this.$router.push('/employees')
    },
    formatExcelDate(numb, format) {
      const time = new Date((numb) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
