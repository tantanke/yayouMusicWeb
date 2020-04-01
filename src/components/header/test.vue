<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item prop="pass">
      <el-input placeholder="手机号" v-model="ruleForm.pass" autocomplete="off" type="">
        <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
      </el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input placeholder="请输入密码" v-model="ruleForm.checkPass" autocomplete="off" type="">
        <template slot="prepend" ><i class="el-icon-mobile"></i></template>
      </el-input>
    </el-form-item>
    <el-form-item style="height: 40px;margin-bottom: 20px;">
      <el-input class="input" maxlength="8" placeholder="请输入验证码" v-model="ruleForm.input"></el-input>
      <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
        <img id="imgIdentifyingCode" maxlength="4"  style="height:40px; width: 98px; cursor: pointer; padding-left:20px; border-radius:4px;"/>
      </div>
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
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit" circle class="one grid-content bg-purple"></el-button></el-col>
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit" circle class="one grid-content bg-purple"></el-button></el-col>
        <el-col :span="6" class="ic"><el-button type="primary" icon="el-icon-edit" circle class="one grid-content bg-purple"></el-button></el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios'
export default {
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
      }/** else if (value !== this.ruleForm.pass) {callback(new Error('两次输入密码不一致!'))这里可以和与后端请求的数据进行比较 } */
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        input: ''
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
    /** 登录界面刚被渲染的时候向后端请求的接口 */
    getHomeInfo () {
      let identifyCodeSrc = ' http://yayoutest.utools.club/getImageCode'
      let objs = document.getElementById('imgIdentifyingCode')
      objs.src = identifyCodeSrc
    },
    /** 点击刷新验证码的时候的函数 */
    getIdentifyingCode: function (bRefresh) {
      let identifyCodeSrc = ' http://yayoutest.utools.club/getImageCode '
      if (bRefresh) {
        identifyCodeSrc = ' http://yayoutest.utools.club/getImageCode? ' + Math.random()
      }
      let objs = document.getElementById('imgIdentifyingCode')
      objs.src = identifyCodeSrc
    },
    /**
     * 点击登录的时候向后端传送数据的函数格式还没有试
     */
    submitForm (formName) {
      axios({
        url: 'http://yayoutest.utools.club/login',
        method: 'post',
        params: {
          'phone': this.pass,
          'password': this.checkPass,
          'code': this.input
        }
      })
        .then(this.getCodeAndpostData)
    },
    getCodeAndpostData (res) {
      res = res.data
      console.log(res)
      if (res.code === 1) {
        alert(res.msg)
      } else if (res.code === 50002) {
        alert(res.msg)
      } else if (res.code === 50001) {
        alert(res.msg)
      } else if (res.code === 500) {
        alert('验证码有误，请重新输入')
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>
<style lang="scss">
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
    margin-top: -88px;
    margin-left: 4px;
  }
  .text2{
    display: inline-block;
    font-size: 12px;
    margin-top: -88px;
    margin-left: 200px;
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
