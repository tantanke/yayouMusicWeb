<template>
  <div class="resetpassword" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 50px 0px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'resetdefault' }">我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>密码修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" >
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="再次输入新密码"></el-input>
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
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      urls: {
        changPassword: 'http://175.24.83.13:8000/userInfo/changePassword'
      },
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: this.urls.changPassword,
            method: 'post',
            params: {
              _method: 'put'
            },
            data: JSON.stringify({
              changPassword: this.ruleForm.pass
            })
              .then(res => {
                if (res.data.errorCode === '1') {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                  console.log()
                } else if (res.data.code === '401') {
                  localStorage.removeItem('Authorization')
                  this.$router.push('/login')
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

<style lang='scss' scoped>
.resetpassword{
  height: 330px;
}
</style>
