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
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
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
      tokenHeader: '',
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
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: _this.urls.submitUrl,
            method: 'post',
            withCredentials: true,
            headers: {
              'Authorization': _this.tokenHeader
            },
            params: JSON.stringify({
              password: _this.ruleForm.pass
            })
          })
            .then(res => {
              if (res.data.errorCode === '1') {
                if (_this.msg === 'resetpassword') {
                  _this.$router.push({name: 'resetpassword'})
                } else if (_this.msg === 'resetphone') {
                  _this.$router.push({name: 'resetphone'})
                }
              } else {
                if (res.data.msg) {
                  _this.$message.error(res.data.msg)
                } else {
                  _this.$message.error('请稍后尝试')
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
    _this.tokenHeader = 'Bearer ' + localStorage.getItem('Authorization')
    console.log(this.msg)
  }
}
</script>

<style lang='scss' scoped>
.check{
  height: 330px;
}
</style>
