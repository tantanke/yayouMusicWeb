<template>
  <div class="mysetting">
    <el-row tag="ul" type="flex">
      <el-col :span="1" :offset="4" tag="li">我的设置</el-col>
      <el-col :span="1" tag="li" class="iconfont">更换头像</el-col>
    </el-row>
    <el-row tag="div" class="top-area">
      <el-col :span="1" :offset="4" class="submit" @click="Submit"><span>上传头像</span></el-col>
      <el-col :span="5" :offset="1" tag="div" class="title">支持JPG、PNG、BMP格式的图片，且文件小于20M</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="4">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else>
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
        <el-row class="sec">
          <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
          <el-button class="cancel">取消</el-button>
        </el-row>
      </el-col>
      <el-col :span="8" :offset="2" tag="div" class="img1-div">
        <img :src="imgUrl1" alt="">
        <span class="title">大尺寸头像(180x180像素)</span>
        <span class="m">头像预览</span>
      </el-col>
      <el-col :span="6" :offset="2" tag="div" class="img2-div">
        <img :src="imgUrl2" alt="">
        <span class="title">大尺寸头像(40x40像素)</span>
        <span class="n">头像预览</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      imageUrl: '',
      imgUrl1: '',
      imgUrl2: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imgUrl1 = URL.createObjectURL(file.raw)
      this.imgUrl2 = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp'
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt20M
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/selectionarea/mysetting.scss";
</style>
