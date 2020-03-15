<template>
  <div class="resetphone" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 50px 0px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'resetdefault' }">我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>手机号修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
import qs from 'qs'
const TIME_COUNT = 60
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
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      count: '',
      timer: null,
      urls: {
        getCode: '',
        changPhone: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/userInfo/changePhone'
      },
      ruleForm: {
        username: '',
        checkPass: '',
        newphone: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          axios.post(this.urls.changPhone, qs.stringify(formName.newphone))
            .then(res => {
              if (res.data.errorCode === '1') {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
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
    },
    getCode (phone) {
      axios.post('this.urls.getCode', qs.stringify(phone))
        .then(res => {
          if (res.data.errorCode === '0') {
            console.log('文件上传成功')
          } else {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage)
            } else {
              console.log('文件上传失败')
            }
          }
        })
        .catch(err => { console.log(err) })
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
.resetphone{
  height: 330px;
}
</style>
