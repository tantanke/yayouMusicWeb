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
    <el-input v-model="ruleForm.name" placeholder="请输入专辑名称"></el-input>
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
   <el-form-item label="是否vip专属" >
    <el-select v-model="ruleForm.isvip" placeholder="请选择视频权限">
      <el-option label="是" value="1"></el-option>
      <el-option label="不是" value="0"></el-option>
    </el-select>
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
  <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-change="imgPreview"
        :auto-upload="false">
        <img v-if="posterURL" :src="posterURL" >
        <img v-else src="../../../assets/img/homePage/cover.png" alt="">
        <el-button v-if="posterURL">更换我的专辑封面</el-button>
        <el-button v-else>上传我的专辑封面</el-button>
</el-upload>
</div><el-button style="margin-top: 35px;" @click="next">下一步</el-button>
    </div>
  <div class="upload" v-if="active == 1">
    <span class="title">上传专辑歌曲</span><span class='title2'>(如暂不需要加入歌曲可点击下一步按钮)</span>
     <el-divider class="line"></el-divider>
     <el-button style="margin-left: 35px;" @click="noMusicNext">下一步</el-button>
     <el-form :model='ablumForm'>
       <el-form-item label="歌曲名" :label-width="formLabelWidth">
              <el-input v-model="ablumForm.songName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名" :label-width="formLabelWidth">
              <el-input v-model="ablumForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否vip专属" :label-width="formLabelWidth">
              <el-select v-model="ablumForm.isvip" placeholder="请选择视频权限">
                <el-option label="是" value="1"></el-option>
                <el-option label="不是" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="视频文件" :label-width="formLabelWidth">
              <el-upload
              ref="uploadAblumMusic"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取音频文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="歌词文件" :label-width="formLabelWidth">
              <el-upload
              ref="uploadAblumWord"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取歌词文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="封面文件" :label-width="formLabelWidth">
              <el-upload
              ref="uploadAblumCover"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取封面文件</el-button>
              <div slot="tip" class="el-upload__tip">每种文件单次最多上传一个</div>
              </el-upload>
              </el-form-item>
               <el-button style="margin-left:160px" type="primary" @click='uploadMusic'>确 定 上 传</el-button>
     </el-form>
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
      // 专辑表单
      ruleForm: {
        name: '',
        category: '',
        edition: '',
        language: '',
        style: '',
        desc: '',
        isvip: ''
      },
      // 上传作品表单 每次填完立刻上传
      formLabelWidth: '150px',
      ablumForm: {
        'songName': '',
        'artist': '',
        'cover': '', // 用户上传音乐封面 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
        'isvip': '',
        'file': '',
        'lyrics': '',
        'albumId': '' // 先获取用户当前已有专辑 然后加入选项中
      },
      posterURL: '',
      coverFile: '', // 记录封面文件
      rules: {
        name: [
          { required: true, message: '请输入专辑名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
        desc: [
          { required: true, message: '请填写专辑描述', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
        ]
      },
      newAlbumUrl: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/newAlbum'
    }
  },
  methods: {
    // Content-Type: application/json表单 Content-Type: multipart/form-data 文件 url 参数 请求头
    uploadMusic () {
      // 每首歌上传之后询问用户是否继续上传
    },
    // 文件预览图
    imgPreview (file, fileList) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.posterURL = URL.createObjectURL(file.raw)
        // 获取当前改变的文件信息
        console.log(file.raw)
        this.coverFile = file.raw
      } else {
        this.$message.error('请选择图片文件')
      }
    },
    beforeAvatarUpload (file) {
      /* var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1) */
      /* const extension = testmsg === 'mp3' */
      /*  if (!extension) {
        this.$message({
          message: '上传文件只能是mp3格式！',
          type: 'error'
        })
      }
      return extension */
      console.log(file.raw)
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (confirm('确认提交吗？')) {
            // 验证后发送请求获取ablumid
            this.nextStep = true
            this.active++
            this.checked = false
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
    noMusicNext () {
      if (confirm('确认不向专辑里添加任何歌曲吗？')) {
        this.active++
      } else {
        return false
      }
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
