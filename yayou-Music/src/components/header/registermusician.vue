<template>
  <div class="composer" style="width:800px;height:600px;">
    <el-row tag="div" class="head">
      <el-col :span="16">艺人注册</el-col>
    </el-row>
    <el-row tag="div" class="main">
      <el-col :span="16" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="真实姓名：" prop="singerName">
          <el-input v-model="ruleForm.singerName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCardNum">
          <el-input v-model="ruleForm.idCardNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="身份证照正面：" prop="idCardPhotoFont">
          <el-upload
            class="avatar-uploader"
            :action="urls.uploadephoto"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPhotoFont"
            :before-upload="beforeAvatarUploadFont"
            v-loading="loadingFont"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <img v-if="ruleForm.idCardPhotoFont" :src="ruleForm.idCardPhotoFont" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" title="点击上传照片"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证照反面：" prop="idCardPhotoBack">
          <el-upload
            class="avatar-uploader"
            :action="urls.uploadephoto"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPhoto"
            :before-upload="beforeAvatarUpload"
            v-loading="loadingBack"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <img v-if="ruleForm.idCardPhotoBack" :src="ruleForm.idCardPhotoBack" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" title="点击上传照片"></i>
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
export default {
  data () {
    return {
      loadingFont: false,
      loadingBack: false,
      active: 0,
      urls: {
        uploadeForm: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/registerAsSinger',
        uploadephoto: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/upImg'
      },
      ruleForm: {
        singerName: '',
        idCardNum: '',
        idCardPhotoFont: '',
        idCardPhotoBack: ''
      },
      rules: {
        trueName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ID: [
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
      this.loadingFont = false
      console.log(res)
      console.log(file)
      this.ruleForm.idCardPhotoFont = URL.createObjectURL(file.raw)
      console.log(this.ruleForm.idCardPhotoFont)
    },
    handleAvatarSuccessPhotoBack (res, file) {
      this.loadingBack = false
      console.log(res)
      console.log(file)
      this.ruleForm.idCardPhotoFont = URL.createObjectURL(file.raw)
      console.log(this.ruleForm.idCardPhotoFont)
    },
    beforeAvatarUploadFont (file) {
      this.loadingFont = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeAvatarUploadBack (file) {
      this.loadingBack = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          axios.post(this.urls.uploadeForm, formName)
            .then(res => {
              if (res.data.code === 1) {
                this.$router.push({name: 'resetmusician'})
                this.$message({
                  message: '音乐人注册成功，请完善信息',
                  type: 'success'
                })
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
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/header/personalinfor.scss";
</style>
