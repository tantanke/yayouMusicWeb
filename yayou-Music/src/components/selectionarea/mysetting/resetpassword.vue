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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone" placeholder="输入手机号"></el-input>
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
      show: true,
      count: '',
      timer: null,
      urls: {
        changPassword: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/userInfo/changePassword',
        getCode: ''
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        phone: '',
        code: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.request({
            url: this.urls.changPassword,
            method: 'post',
            params: {
              _method: 'put'
            },
            data: JSON.stringify({
              phone: formName.phone,
              changPassword: formName.pass
            })
              .then(res => {
                if (res.data.errorCode === '1') {
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
    },
    getCode (phone) {
      axios.post(this.urls.getCode, qs.stringify(phone))
        .then(res => {
          if (res.data.errorCode === '1') {
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
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.resetpassword{
  height: 330px;
}
</style>
