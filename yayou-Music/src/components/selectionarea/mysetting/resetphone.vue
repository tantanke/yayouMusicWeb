<template>
  <div class="resetphone" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 50px 0px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'resetdefault' }">我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>手机号修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="phone">
    <el-input v-model.number="ruleForm.phone" placeholder="输入新手机号"></el-input>
  </el-form-item>
  <el-form-item label="" prop="code">
    <div class="input-div" v-show="ruleForm.phone">
     <el-input maxlength="6" name="code" v-model.trim="ruleForm.code" placeholder="输入验证码" style="width:80px;display:inline-block;"></el-input>
     <el-button @click="getCode(ruleForm.phone)" :disabled="!show" style="display:inline-block;">
         <span v-show="show">获取验证码</span>
         <span v-show="!show" class="count">{{count}}s后重新发送</span>
     </el-button>
    </div>
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
let tAxios = axios.interceptors.request.use(
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
/* 重新发送验证码的时间间隔 */
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('电话不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确电话号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      urls: {
        changPhone: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/userInfo/changePhone'
      },
      ruleForm: {
        username: '',
        newphone: ''
      },
      rules: {
        phone: [
          {validator: checkAge, trigger: 'blur', require: 'true'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          tAxios.post(this.urls.changPhone, JSON.stringify({newphone: formName.newphone}))
            .then(res => {
              if (res.data.errorCode === '1') {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
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
            .catch(err => { console.log(err) })
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
.resetphone{
  height: 330px;
}
</style>
