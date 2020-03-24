<template>
  <div class="composer" style="width:800px">
    <el-row tag="div" class="head">
      <el-col :span="16">信息修改</el-col>
    </el-row>
    <el-row tag="div" class="main">
      <el-col :span="14" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="艺人名：" prop="singerName">
          <el-input v-model="ruleForm.singerName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="艺人照片：" prop="photo">
          <el-upload
            class="avatar-uploader"
            :action="urls.uploadephoto"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPhoto"
            :before-upload="beforeAvatarUpload"
            v-loading="loadingPhoto"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" title="点击上传照片"></i>
            </el-upload>
          </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="团体"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区：">
        <el-col :span="8">
          <el-form-item prop="province">
            <el-select v-model="ruleForm.province" placeholder="四川省">
              <el-option label="四川" value="sichuan"></el-option>
              <el-option label="山西" value="shanxi"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8" :pull="6">
          <el-form-item prop="city">
            <el-select v-model="ruleForm.city" placeholder="成都市">
              <el-option label="成都市" value="chengdu"></el-option>
              <el-option label="北京市" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-form-item>
        <el-form-item label="流派风格：" prop="style">
          <el-select v-model="ruleForm.style" placeholder="古典">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="dfsv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人介绍：" prop="intro">
          <el-input type="textarea" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="6" :offset="4">
        <el-upload
        class="avatar-uploader"
        :action="urls.uploadephoto"
        :show-file-list="false"
        :on-success="handleAvatarSuccessHeadImg"
        :before-upload="beforeAvatarUpload"
        title="点击上传头像"
        v-loading="loadingHeadImg"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <img v-if="ruleForm.headImg" :src="ruleForm.headImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
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
      loadingPhoto: false,
      loadingHeadImg: false,
      active: 0,
      urls: {
        uploadeForm: 'http://175.24.83.13:8000/singer/editSingerInfo',
        uploadephoto: 'http://175.24.83.13:8000/upImg'
      },
      ruleForm: {
        singerName: '',
        province: '',
        city: '',
        sex: '',
        style: '',
        photo: '',
        headImg: '',
        intro: ''
      },
      rules: {
        singerName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        photo: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ],
        headImg: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ],
        intro: [
          { required: false, message: '', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccessPhoto (res, file) {
      this.loadingPhoto = false
      console.log(res)
      console.log(file)
      this.ruleForm.photo = URL.createObjectURL(file.raw)
    },
    handleAvatarSuccessHeadImg (res, file) {
      this.loadingHeadImg = false
      console.log(res)
      console.log(file)
      this.ruleForm.headImg = URL.createObjectURL(file.raw)
    },
    beforeAvatarUploadHeadImg (file) {
      console.log(file)
      this.loadingHeadImg = true
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
    beforeAvatarUploadPhoto (file) {
      console.log(file)
      this.loadingPhoto = true
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
          axios.post(this.urls.uploadeForm, formName)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                console.log(res)
              } else if (res.data.code === '401') {
                localStorage.removeItem('Authorization')
                this.$router.push('/login')
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
