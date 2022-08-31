<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
    <!-- <ImageUpload :limit="2" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    /**
     * 做上传前的校验
     */
    beforeUpload(file) {
      // 做校验
      return true
    },
    /**
     * 上传成功后拿到文件中的数据
     */
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
