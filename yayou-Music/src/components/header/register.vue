<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item prop="name">
            <el-input placeholder="用户名" v-model="ruleForm.name">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="familyId">
            <el-input placeholder="家族id" v-model="ruleForm.familyId">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="cipher">
            <el-input placeholder="密码" v-model="ruleForm.cipher">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <el-input placeholder="电话号码" v-model="ruleForm.phone">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input placeholder="验证码" v-model="ruleForm.email">
                <template slot="append"><el-button @click="getEmail(), ajust()">发送验证码</el-button></template>
            </el-input>
        </el-form-item>
        <el-form-item label="出生日期" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="bottom-re">
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dataCode: String,
      ruleForm: {
        name: '',
        familyId: '',
        cipher: '',
        phone: '',
        email: '',
        date1: '',
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 1000000, message: '长度为11位', trigger: 'blur' }
        ],
        familyId: [
          { required: true, message: '请输入家族id', trigger: 'blur' },
          { min: 0, max: 10000000, message: '输入有误请重新输入', trigger: 'blur' }
        ],
        cipher: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 100000, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写验证码', trigger: 'blur' },
          { min: 0, max: 1000000, trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /**
     * hanleRemove和handlePictureCardPreview函数是负责控制头像部分从本地上传照片
     */
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     *获取验证码
     */
    getEmail () {
      axios({
        url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/sendSmsCode',
        method: 'post',
        params: {
          'userPhone': this.phone
        }
      })
        .then(this.getEmailCode)
    },
    /**
     * 验证号码以前有没有被人用过，是否可以用来注册
     */
    ajust () {
      axios({
        url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/findUserExist',
        method: 'post',
        params: {
          'userPhone': this.phone
        }
      })
        .then(this.getAjustData)
    },
    submitForm (formName) {
      /**
       * 这个是判断输入内容的格式是否符合标准
       */
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/doRegister',
            method: 'post',
            params: {
              'userName': this.name,
              'familyId': this.familyId,
              'password': this.cipher,
              'userPhone': this.phone,
              'smsCode': this.email,
              'userBirth': this.data1,
              'userSex': this.resource
            }
          })
            .then(this.getHomeInfoSucc)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        alert('注册成功')
        console.log(res.msg)
      } else if (res.code === 50004 || 20004) {
        alert(res.msg)
      }
    },
    getEmailCode (res) {
      res = res.data
      if (res.code === 1) {
        res = res.data
        console.log(res) /** 这里可以加else if函数来判断改号码获取验证码是否成功 */
      }
    },
    getAjustData (res) {
      res = res.data
      if (res.code === 1) {
        console.log(res)
        alert(res.data) /** 这里用来判断号码是否可以使用，返回不同的code值，弹出不同的值 */
      }
    },
    /**
     * 重置函数
     */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.el-form-item__content{
    margin-left: 0px!important;
}
.bottom-re{
    margin-left: 80px;
}
.el-upload{
    margin-left: 182px;
    margin-bottom: 20px;
}
</style>
