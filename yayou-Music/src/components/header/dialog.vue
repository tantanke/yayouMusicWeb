<template class="login">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
    <el-form-item prop="pass">
      <el-input placeholder="手机号" v-model="ruleForm.pass" autocomplete="off" type="">
        <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
      </el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input placeholder="请输入密码" v-model="ruleForm.checkPass" autocomplete="off" type="password">
        <template slot="prepend" ><i class="el-icon-edit-outline"></i></template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" size="medium" class="login1">登录</el-button>
    </el-form-item>
    <el-form-item>
      <el-link type="primary" class="text1">立即注册</el-link>
      <el-link type="primary" class="text2">忘记密码</el-link>
    </el-form-item>
    <el-form-item>
      <el-link type="primary" class="text3">其他登录方式</el-link>
    </el-form-item>
    <el-form-item class="others">
      <el-row :gutter="14">
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit-outline" circle class="one grid-content bg-purple"></el-button></el-col>
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit" circle class="one grid-content bg-purple"></el-button></el-col>
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit" circle class="one grid-content bg-purple"></el-button></el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios'
export default {
  props: ['isnotLogin'],
  name: 'DiaLog',
  data () {
    /** 判断输入手机号的对错和有么有 */
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    /** 判断输入密码的对错 */
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
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
    /**
     * 点击登录的函数
     */
    submitForm (formName) {
      axios({
        url: 'http://175.24.83.13:8000/login',
        withCredentials: true,
        method: 'post',
        params: {
          'phone': this.ruleForm.pass,
          'password': this.ruleForm.checkPass
        }
      })
        .then(this.getCodeAndpostData)
    },
    getCodeAndpostData (res) {
      console.log(res)
      console.log(res.headers.authorization)
      localStorage.setItem('Authorization', res.headers.authorization)
      res = res.data
      if (res.code === 1) {
        localStorage.setItem('Role', res.data)
        alert(res.msg)
        this.$emit('success', false)
      } else if (res.code === 50002) {
        alert(res.msg)
      } else if (res.code === 50001) {
        alert(res.msg)
      } else if (res.code === 500) {
        alert('验证码有误，请重新输入')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-form-item__content{
    margin: 0 auto!important
  }
  .login1{
    display: block;
    width: 320px;
    height: auto;
    margin: 16px auto;
  }
  .text1{
    display: inline-block;
    font-size: 12px;
    margin-top: -50px;
    margin-left: 60px;
  }
  .text2{
    display: inline-block;
    font-size: 12px;
    margin-top: -50px;
    margin-left: 100px;
  }
  .text3{
    display: block;
    font-size: 12px;
    text-align: center;
  }
  .others{
    display: block;
    width: 320px;
    height: auto;
    margin: 0 auto;
  }
  .el-col {
    border-radius: 4px;
  }
  .ic{
    text-align: center;
    width: 33%;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .divIdentifyingCode {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 98px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    margin: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 96px;
    height: 40px
  }
  .divIdentifyingCode img{
    padding-left: 0!important;
    border-radius: 0!important;
  }
</style>
