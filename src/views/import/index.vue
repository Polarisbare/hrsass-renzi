<template>
  <div>
    <UploadExcel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { batchAddEmployeeApi } from '@/api/employees'
export default {
  name: 'Import',
  methods: {
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    },
    batchAddEmployee() {
      batchAddEmployeeApi()
    }
  }
}
</script>

<style>

</style>
