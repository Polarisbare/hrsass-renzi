<template>
  <div class="upload-image">
    <!-- i标签 显示删除更换内的+号
        list-type="picture-card"显示的上传组件的外边框
        action：比穿的 作用：图片服务器对应的地址当你不想使用action上传地址可以用# -->
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      limit:limit
      :class="{disabled:isDisabled}"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
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
      fileList: [
        {
          url: 'https://img2.baidu.com/it/u=1540549618,2412230718&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          url: 'https://img2.baidu.com/it/u=353811267,2287048307&fm=253&fmt=auto&app=138&f=JPEG?w=334&h=500'
        }
      ],
      //   showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    isDisabled() {
      return this.fileList.length >= this.limit
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = [...fileList]
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
