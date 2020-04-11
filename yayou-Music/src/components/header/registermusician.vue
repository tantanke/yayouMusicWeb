<template>
  <div class="composer" style="width:900px;height:600px;">
    <el-row tag="div" class="head">
      <el-col :span="16">艺人注册</el-col>
    </el-row>
    <el-row tag="div" class="main">
      <el-col :span="16" :offset="2">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="真实姓名：" prop="singerName">
          <el-input v-model="ruleForm.singerName" placeholder="" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCardNum">
          <el-input v-model="ruleForm.idCardNum" placeholder="" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="身份证照正面：" prop="idCardPhotoFont">
          <el-upload
            class="avatar-uploader"
            action="#"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPhotoFont"
            :before-upload="beforeAvatarUploadFont">
            <el-progress v-if="loadingFont" type="circle" :percentage="num" style="margin:30px 140px;"></el-progress>
            <img v-else-if="ruleForm.idCardPhotoFont" :src="ruleForm.idCardPhotoFont" class="avatar">
            <div v-else>
              <i class="el-icon-plus avatar-uploader-icon"></i><span class="ti">选择一张本地图片</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证照反面：" prop="idCardPhotoBack">
          <el-upload
            class="avatar-uploader"
            action="#"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPhotoBack"
            :before-upload="beforeAvatarUploadBack"
            list-type="picture">
            <el-progress v-if="loadingBack" type="circle" :percentage="num2" style="margin:30px 140px;"></el-progress>
            <img v-else-if="ruleForm.idCardPhotoBack" :src="ruleForm.idCardPhotoBack" class="avatar">
            <div v-else>
              <i class="el-icon-plus avatar-uploader-icon"></i><span class="ti">点击上传照片</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
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
      loadingFont: false,
      loadingBack: false,
      source: null, // 取消上传
      tokenHeader: '',
      num: 0,
      num2: 0,
      active: 0,
      domain: '',
      upToken: '',
      urls: {
        uploadeForm: 'http://175.24.83.13:8000/registerAsSinger',
        qiNiuYun: 'http://upload.qiniup.com/',
        getUpToken: 'http://175.24.83.13:8000/getUpToken'
      },
      config: {useCdnDomain: true, region: qiniu.region.z0},
      putExtra: {
        fname: '',
        params: {},
        mimeType: null
      },
      ruleForm: {
        singerName: '',
        idCardNum: '',
        idCardPhotoFont: '',
        idCardPhotoBack: ''
      },
      rules: {
        singerName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        idCardNum: [
          { required: true, message: '请输入身份证号', trigger: 'change' },
          {
            required: true,
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确的身份证号',
            trigger: 'blur'
          }
        ],
        idCardPhotoFont: [
          {required: true, message: '请选择身份证正面照', trigger: 'change'}
        ],
        idCardPhotoBack: [
          {required: true, message: '请选择身份证背面照', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccessPhotoFont (res, file) {
      console.log(res)
    },
    handleAvatarSuccessPhotoBack (res, file) {
      console.log(res)
    },
    beforeAvatarUploadFont (file) {
      let _this = this
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        _this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        _this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        _this.loadingFont = true
        _this.imgFile = file
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        _this.source = source
        let df = new FormData()
        df.append('file', file)
        df.append('token', _this.upToken)
        axios({
          url: _this.urls.qiNiuYun,
          method: 'post',
          data: df,
          cancelToken: _this.source.token, // 取消事件
          onUploadProgress (progressEvent) {
            if (progressEvent.lengthComputable) {
              let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
              _this.num = parseInt(val)
            }
          }
        })
          .then(res => {
            console.log(res)
            let hash = res.data.hash
            let domain = _this.domain + '/'
            _this.ruleForm.idCardPhotoFont = domain + hash
            _this.loadingFont = false
          })
          .catch(err => {
            console.log(err)
            if (_this.axios.isCancel(err)) {
              _this.$message({type: 'success', message: '取消上传操作成功'})
            }
            _this.loadingFont = false
          })
      }
      return isJPG && isLt2M
    },
    beforeAvatarUploadBack (file) {
      console.log(file)
      let _this = this
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        _this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        _this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        _this.loadingBack = true
        _this.imgFile = file
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        _this.source = source
        let df = new FormData()
        df.append('file', file)
        df.append('token', _this.upToken)
        axios({
          url: _this.urls.qiNiuYun,
          method: 'post',
          data: df,
          cancelToken: _this.source.token, // 取消事件
          onUploadProgress (progressEvent) {
            if (progressEvent.lengthComputable) {
              let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
              _this.num2 = parseInt(val)
            }
          }
        })
          .then(res => {
            console.log(res)
            let hash = res.data.hash
            let domain = _this.domain + '/'
            _this.ruleForm.idCardPhotoBack = domain + hash
            _this.loadingBack = false
          })
          .catch(err => {
            console.log(err)
            if (_this.axios.isCancel(err)) {
              _this.$message({type: 'success', message: '取消上传操作成功'})
            }
            _this.loadingBack = false
          })
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dataForm = {}
          dataForm.singerName = this.ruleForm.singerName
          dataForm.idCardNum = this.ruleForm.idCardNum
          dataForm.idCardPhotoFont = this.ruleForm.idCardPhotoFont
          dataForm.idCardPhotoBack = this.ruleForm.idCardPhotoBack
          // let dataForm = new FormData()
          // dataForm.append('singerName', this.ruleForm.singerName)
          // dataForm.append('idCardNum', this.ruleForm.idCardNum)
          // dataForm.append('idCardPhotoFont', this.ruleForm.idCardPhotoFont)
          // dataForm.append('idCardPhotoBack', this.ruleForm.idCardPhotoBack)
          console.log(dataForm)
          axios({
            url: this.urls.uploadeForm,
            method: 'post',
            params: dataForm,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
            }
          })
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: '音乐人注册成功，请完善信息',
                  type: 'success'
                })
                this.$router.push({name: 'resetmusician'})
                window.localStorage.setItem('Role', 'Singer')
                console.log(res)
              } else {
                this.$message.err(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      if (this.source) {
        this.source.cancel()
        this.$refs[formName].resetFields()
      }
    }
  },
  mounted () {
    let _this = this
    axios.create({
      withCredentials: false
    })
    _this.tokenHeader = {'Authorization': 'Bearer ' + localStorage.getItem('Authorization')}
    axios({
      method: 'post',
      url: _this.urls.getUpToken,
      headers: {
        'Authorization': _this.tokenHeader
      }
    }).then(res => {
      _this.upToken = res.data.upToken
      _this.domain = res.data.domain
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/header/personalinfor.scss";
.ti{
  color: #ccc;
}
</style>
