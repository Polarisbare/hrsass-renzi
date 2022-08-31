<template>
  <div class="upload-image">
    <!-- i标签 显示删除更换内的+号
        list-type="picture-card"显示的上传组件的外边框
        action：必传的 作用：图片服务器对应的地址当你不想使用action上传地址可以用#
        :http-request="handleRequest"   覆盖之前的上传的可以自定义实现）
        :on-change="hanldeChange"  文件改变时的钩子包括上传添加都会调用 上传文件改变的时候触发事件
        ：before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。-->

    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      limit:limit
      :class="{disabled:isDisabled}"
      :on-remove="handleRemove"
      :http-request="handleRequest"
      :on-change="hanldeChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
import cos from '@/utils/cos'
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      //   showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    isDisabled() {
      return this.fileList.length >= this.limit
    },
    isAllUploadSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.fileList = [...fileList]
    },
    handleRequest({ file }) {
      // console.log(obj)  返回的file.name 要用到
      const fileObj = this.fileList.find(item => item.uid === file.uid)
      fileObj.status = 'uploading'
      cos.putObject({
        Bucket: 'hrscas-1313551044', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: +new Date() + file.name, // key值必须唯一否则会发生覆盖
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
          fileObj.percentage = progressData.percent * 100
        }
      }, function(err, data) {
        console.log(err || data)
        if (err) {
          this.$message.error('上传失败')
          return
        }
        // location = 'http' + data.Location
        // 更新状态
        // 修改地址
        fileObj.url = 'https://' + data.Location
        setTimeout(() => {
          fileObj.status = 'success'
        }, 800)
      })
    },
    hanldeChange(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      console.log(file)
      // 判断文件类型
      const fileType = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!fileType.includes(file.type)) {
        this.$message.error('图片文件类型不正确')
        return false
      }
      // 判断文件大小
      // file.size 单位是B
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('图片大小不能超过2M')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
    .disabled{
        ::v-deep{
            .el-upload{
                display: none;
            }
        }
    }
</style>
