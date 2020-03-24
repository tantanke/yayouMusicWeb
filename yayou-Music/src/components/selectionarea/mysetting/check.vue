<template>
  <div class="check" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 50px 0px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'resetdefault' }">我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>用户验证</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      msg: '',
      urls: {
        submitUrl: 'http://175.24.83.13:8000/confirmPassword'
      },
      ruleForm: {
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: this.urls.submitUrl,
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            params: JSON.stringify({
              password: this.ruleForm.pass
            })
          })
            .then(res => {
              if (res.data.errorCode === '1') {
                if (this.msg === 'resetpassword') {
                  this.$router.push({name: 'resetpassword'})
                } else if (this.msg === 'resetphone') {
                  this.$router.push({name: 'resetphone'})
                }
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted: function () {
    var _this = this
    _this.msg = this.$route.params.msg
    console.log(this.msg)
  }
}
</script>

<style lang='scss' scoped>
.check{
  height: 330px;
}
</style>
