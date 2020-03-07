<template>
  <div class="create-firstpage">
    <div class="step">
      <el-steps :active="active" finish-status="success" :space="400" align-center>
        <el-step :title="ablumCate" ></el-step>
        <el-step title="上传作品" ></el-step>
        <el-step title="确认使用许可" ></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
    </div>
    <div class="stepform" v-if="active == 0">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
  <el-form-item label="专辑名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="专辑类型" prop="category">
    <el-select v-model="ruleForm.category" placeholder="请选择专辑类型">
      <el-option label="古典" value="shanghai"></el-option>
      <el-option label="现代" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专辑版本" prop="edition">
    <el-select v-model="ruleForm.edition" placeholder="请选择专辑版本">
      <el-option label="现场版" value="shanghai"></el-option>
      <el-option label="录制版" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="语种" prop="language">
    <el-select v-model="ruleForm.language" placeholder="请选择专辑语种">
      <el-option label="彝语" value="shanghai"></el-option>
      <el-option label="汉语" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专辑风格" prop="style">
    <el-select v-model="ruleForm.style" placeholder="请选择专辑风格">
      <el-option label="古典" value="shanghai"></el-option>
      <el-option label="现代" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专辑描述" prop="desc" placeholder="字符控制在10-1000之内" >
    <el-input type="textarea" v-model="ruleForm.desc" :rows="6"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<div class="cover">
  <img src="./../../../assets/img/homePage/cover.png" alt="">
   <el-button >本地上传</el-button>
  <el-button type="primary">智能生成</el-button>
</div><el-button style="margin-top: 35px;" @click="next">下一步</el-button>
    </div>
  <div class="upload" v-if="active == 1">
    <p class="title">上传专辑歌曲</p>
     <el-divider class="line"></el-divider>
    <div class="createcate">
      <ul class="upul">
        <li >
          <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :beforeUpload="beforeAvatarUpload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将音频文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传MP3文件</div>
      </el-upload>
      </li>
      </ul>
      <div class="upbutton">
        <el-button @click="uploadFile" class="hasup"><i class="el-icon-plus"></i>点我立刻上传</el-button>
      </div>
    </div>
          <el-button style="margin-top: 35px;" @click="next">下一步</el-button>
  </div>
  <div class="confirmuse" v-if="active == 2">
    <div class="xieyiBox">
       <img src="../../../assets/img/homePage/xieyi.png" alt="">
       <el-checkbox v-model="checked">我已经阅读了用户协议</el-checkbox>
             <el-button style="margin-top: 35px;" @click="nextclick3">下一步</el-button>
    </div>
  </div>
  <div class="successfully" v-if="active == 3 && checked == true">
    <p>恭喜你,添加成功！</p>
    <div><i class="el-icon-check"></i></div>
    <router-link tag="el-button" :to="{name:'handinprodution'}" style="margin-top: 35px;">继续添加</router-link>
    <router-link tag="el-button" :to="{name:'index'}" style="margin-top: 35px;">回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nextStep: false,
      active: 0,
      checked: '',
      next2: false,
      next3: false,
      ablumCate: '',
      ruleForm: {
        name: '',
        category: '',
        edition: '',
        language: '',
        date: '',
        style: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择专辑类型', trigger: 'change' }
        ],
        agree: [
          { required: true, message: '请选择同意之后在进行下一步', trigger: 'change' }
        ],
        edition: [
          { required: true, message: '请选择专辑版本', trigger: 'change' }
        ],
        language: [
          { required: true, message: '请选择语种', trigger: 'change' }
        ],
        style: [
          { required: true, message: '请选择语种', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写专辑描述', trigger: 'blur' },
          { min: 10, max: 1000, message: '长度在 10 到 1000 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // Content-Type: application/json表单 Content-Type: multipart/form-data 文件 url 参数 请求头
    beforeAvatarUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'mp3'
      if (!extension) {
        this.$message({
          message: '上传文件只能是mp3格式！',
          type: 'error'
        })
      }
      return extension
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (confirm('确认提交吗？')) {
            this.nextStep = true
            this.active++
            this.checked = false
            // axios
            console.log(this.ruleForm)
            this.$refs.isShuzi.disabled = true
          }
        } else {
          console.log('提交失败，请重试！')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    nextclick1 () {
      if (this.active++ > 2) this.active = 0
      console.log(this.active)
    },
    nextclick2 () {
      // 用户至少要完成创造专辑和上传音乐的任意一步才能到下一步
      if (this.active++ > 2) this.active = 0
    },
    nextclick3 () {
      if (this.checked) {
        this.active++
      } else {
        alert('请先同意用户协议!')
      }
    },
    isShuzi () {
      // 鼠标移入的一瞬间就判断是否符合要求
      this.$refs.isShuzi.disabled = true
    },
    submitFileNew () { // 上传新建专辑音乐

    }
  },
  mounted () {
    if (this.$route.meta.isNormol) {
      this.ablumCate = '编辑普通专辑信息'
    } else {
      this.ablumCate = '编辑数字专辑信息'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/createcentre/main/firstpage.scss";
</style>
