<template>
  <div class="mysetting">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:510px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'resetdefault' }">我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>头像设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row tag="div" class="top-area">
      <el-col :span="1" :offset="7" class="submit"><span @click="submit">上传头像</span></el-col>
      <el-col :span="5" :offset="1" tag="div" class="title">支持JPG、PNG、BMP格式的图片，且文件小于2M</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="7">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="#"
          :limit="1"
          :auto-upload="false"
          :headers="tokenHeader"
          :on-progress="onProgress"
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
          <el-button type="primary" @click="saveImg" class="save">保存</el-button>
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
import * as qiniu from 'qiniu-js'
export default {
  data () {
    return {
      tokenHeader: null,
      loadingHeadImg: false,
      domain: '',
      upToken: '',
      imageUrl: '',
      imgUrl1: '',
      imgUrl2: '',
      imgFile: '',
      upProgress: '', // 作为计算属性的载体
      urls: {
        setHeadImg: 'http://175.24.83.13:8000/user/setHeadImg',
        uploadephoto: 'http://175.24.83.13:8000/upImg',
        getUpToken: 'http://175.24.83.13:8000/getUpToken',
        qiNiuYun: 'http://upload.qiniup.com/'
      },
      config: {useCdnDomain: true, region: qiniu.region.z0},
      putExtra: {
        fname: '',
        params: {},
        mimeType: null
      }
    }
  },
  methods: {
    uploadProgress () {
      return '请不要刷新或关闭页面，已上传:%' + this.upProgress
    },
    submit () {
      this.$refs.upload.submit()
      if (this.imgFile) {
      } else {
        this.$message.error('请先选择上传图片')
      }
    },
    onProgress (event, file, fileList) {
      console.log('onProgress')
      console.log(event)
      console.log(file)
      console.log(fileList)
    },
    handleAvatarSuccess (resd, file, fileList) {
      this.loadingHeadImg = false
      console.log('handleAvatarSuccess')
      console.log(resd)
      console.log(file)
      console.log(fileList)
    },
    beforeAvatarUpload (file) {
      let _this = this
      console.log('beforeAvatarUpload')
      const isJPG = file.type === ('image/jpeg' || 'image/png' || 'image/bmp')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        _this.$message.error('上传头像图片只能是 JPG/PNG格式!')
      }
      if (!isLt2M) {
        _this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      if (isJPG && isLt2M) {
        _this.imgFile = file
        _this.loadingHeadImg = true
        let df = new FormData()
        df.append('file', file)
        df.append('token', _this.upToken)
        axios({
          url: _this.urls.qiNiuYun,
          method: 'post',
          data: df
        })
          .then(res => {
            console.log(res)
            let hash = res.data.hash
            let domain = _this.domain + '/'
            _this.imageUrl = 'http://' + domain + hash
            this.imgUrl1 = _this.imageUrl
            this.imgUrl2 = _this.imageUrl
          })
          .catch(err => {
            console.log(err)
          })
      }
      return isJPG && isLt2M
    },
    handleAvatarChange (file, fileList) {
      console.log('handleAvatarChange')
      this.imgFile = file.raw
      console.log(this.imgFile)
      console.log(fileList)
    },
    saveImg () {
      let _this = this
      let imgName = _this.imgFile.name
      let imgFile = _this.imgFile
      let observer = {
        next (res) {
          _this.upProgress = res.total.percent.toFixed(2)
        },
        error (err) {
          console.log(err)
        },
        complete (res) {
          let hash = res.hash
          let imgFileUrl = _this.domain + hash
          console.log(imgFileUrl)
          axios({
            url: _this.urls.setHeadImg,
            method: 'post',
            headers: {
              'Authorization': _this.tokenHeader
            },
            params: {
              _method: 'put'
            },
            data: {'imgUri': imgFileUrl}})
            .then(res => {
              if (res.data.errorCode === 1) {
                console.log(res.data.msg)
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
        }
      }
      let observable = qiniu.upload(imgFile, imgName, _this.upToken, _this.putExtra, _this.config)
      observable.subscribe(observer)
    }
  },
  mounted () {
    axios.create({
      withCredentials: false
    })
    this.tokenHeader = {'Authorization': 'Bearer ' + localStorage.getItem('Authorization')}
    axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          return config
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
    console.log('1561465')
    axios({
      method: 'post',
      url: this.urls.getUpToken,
      headers: {
        'Authorization': this.tokenHeader
      }
    }).then(res => {
      this.upToken = res.data.upToken
      this.domain = res.data.domain
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/selectionarea/mysetting.scss";
</style>
