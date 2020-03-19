<template>
  <div class="mysetting">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:510px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>头像设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row tag="div" class="top-area">
      <el-col :span="1" :offset="7" class="submit" @click="Submit"><span>上传头像</span></el-col>
      <el-col :span="5" :offset="1" tag="div" class="title">支持JPG、PNG、BMP格式的图片，且文件小于20M</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="7">
        <el-upload
          class="avatar-uploader"
          action="/image/setHeadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-loading="loadingHeadImg"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else>
            <i class="el-icon-plus avatar-uploader-icon"></i><span class="ti">选择一张本地图片</span>
          </div>
        </el-upload>
        <el-row class="sec">
          <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
          <el-button class="cancel" @click="loadingHeadImg = false">取消</el-button>
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
import axios from 'axios'
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  data () {
    return {
      loadingHeadImg: false,
      imageUrl: '',
      imgUrl1: '',
      imgUrl2: '',
      urls: {
        setHeadImg: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (resd, file) {
      this.loadingHeadImg = false
      console.log(resd)
      if (resd.data.code === '401') {
        localStorage.removeItem('Authorization')
        this.$router.push('/login')
      }
      this.imgUrl1 = URL.createObjectURL(file.raw)
      this.imgUrl2 = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      this.loadingHeadImg = true
      const isJPG = file.type === ('image/jpeg' || 'image/png' || 'image/bmp')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      axios.request({
        url: this.urls.setHeadImg,
        method: 'post',
        params: {
          _method: 'put'
        },
        data: JSON.stringify({
          setHeadImg: this.imageUrl
        })
          .then(res => {
            if (res.data.errorCode === '1') {
              console.log()
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/selectionarea/mysetting.scss";
</style>
