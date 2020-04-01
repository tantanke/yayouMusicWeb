<template>
  <div class="create-firstpage">
    <div class="step">
      <el-steps :active="active" finish-status="success" :space="400" align-center>
        <el-step :title="albumCate" ></el-step>
        <el-step title="上传作品" ></el-step>
        <el-step title="确认使用许可" ></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
    </div>
    <div class="stepform" v-if="active == 0" element-loading-text="努力上传中，请不要刷新或关闭页面!" element-loading-spinner="el-icon-loading" v-loading="loadingAblum1">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
  <el-form-item label="专辑名称" prop="albumName">
  <el-input v-model="ruleForm.albumName" placeholder="请输入专辑名称"></el-input>
  </el-form-item>
  <el-form-item label="作者名称" prop="artist">
  <el-input v-model="ruleForm.artist" placeholder="请输入作者名称"></el-input>
  </el-form-item>
  <el-form-item label="专辑描述" prop="des" placeholder="字符控制在10-1000之内" >
    <el-input type="textarea" v-model="ruleForm.des" :rows="6"></el-input>
  </el-form-item>
  <el-form-item>
    <div class="cover">
  <el-upload
        action="none"
        :show-file-list="false"
        :on-change="imgPreview"
        :auto-upload="false">
        <img v-if="posterURL" :src="posterURL" >
        <img v-else src="../../../assets/img/homePage/cover.png" alt="">
        <el-button v-if="posterURL">更换我的专辑封面</el-button>
        <el-button v-else>上传我的专辑封面</el-button>
</el-upload>
</div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="uploadAblum">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  <div class="upload" v-if="active == 1" element-loading-text="努力上传中，请不要刷新或关闭页面!" element-loading-spinner="el-icon-loading" v-loading="loadingSong1">
     <span class="title">上传专辑歌曲</span><span class='title2'>(如暂不需要加入歌曲可点击下一步按钮)</span>
     <el-divider class="line"></el-divider>
    <el-button style="margin-left: 35px;" @click="noMusicNext">下一步</el-button>
     <el-form :model='albumForm' :rules='songRules' ref="songForm">
       <el-form-item label="歌曲名" :label-width="formLabelWidth" prop='songName'>
              <el-input v-model="albumForm.songName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名" :label-width="formLabelWidth" prop='artist'>
              <el-input v-model="albumForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="音频文件" :label-width="formLabelWidth">
              <el-upload
              ref="musicupload"
              action="none"
              :auto-upload="false"
              :on-change='beforeUpMp3'
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取音频文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="歌词文件" :label-width="formLabelWidth">
              <el-upload
              ref="lrcupload"
              action="none"
              :on-change='beforeUpLrc'
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取歌词文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="封面文件" :label-width="formLabelWidth">
              <el-upload
              ref="imgupload"
              action="none"
              :on-change='beforeUpImg'
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取封面文件</el-button>
              <div slot="tip" class="el-upload__tip">每种文件单次最多上传一个,上传错误请点击右侧删除符号后重选</div>
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
    <router-link tag="el-button" :to="{name:'find'}" style="margin-top: 35px;">回首页</router-link>
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
      albumCate: '',
      ruleForm: {
        albumName: '',
        des: '',
        isVip: '',
        cover: '',
        artist: ''
      },
      isMp3: false,
      isImg: false,
      isLrc: false,
      // 上传作品表单 每次填完立刻上传
      formLabelWidth: '150px',
      albumForms: [],
      albumForm: {
        songName: '',
        artist: '',
        cover: '', // 用户上传音乐封面 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
        audio: '',
        isvip: '',
        lyrics: '',
        albumId: '' // 先获取用户当前已有专辑 然后加入选项中
      },
      posterURL: '',
      coverFile: '', // 记录封面文件
      musicFile: '', // 记录音乐文件
      lycFile: '', // 记录歌词文件
      rules: {
        albumName: [
          { required: true, message: '请输入专辑名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        artist: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '请填写专辑描述', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      songRules: {
        artist: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        songName: [
          { required: true, message: '请输入歌曲名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 上传文件凭证
      domain: '',
      upToken: '',
      upUrls: {
        upAlbumUrl: '/singer/newAlbum',
        upSongUrl: '/singer/upSong',
        upCoverUrl: '/setCover'
      },
      loadingAblum: false,
      loadingSong: false,
      tokenHeader: ''
    }
  },
  methods: {
    // Content-Type: application/json表单 Content-Type: multipart/form-data 文件 url 参数 请求头
    uploadAblum () {
      // 每首歌上传之后询问用户是否继续上传
      let _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.coverFile) {
            this.$message.error('请选择封面!')
            return false
          }
          if (confirm('确认提交吗？')) {
            // axios 发送请求获取封面链接 填入表单
            this.loadingAblum = true
            let albumCover = this.coverFile
            let domain = _this.domain + '/'
            let coverForm = new FormData()
            coverForm.append('file', albumCover)
            coverForm.append('token', _this.upToken)
            _this.$axios({
              method: 'post',
              url: 'http://upload.qiniup.com/',
              data: coverForm
            })
              .then(res => {
                let hash = res.data.hash
                _this.ruleForm.cover = domain + hash
                return _this.$axios({
                  method: 'get',
                  url: 'http://175.24.83.13:8000/singer/newAlbum',
                  params: _this.ruleForm,
                  headers: {
                    'Authorization': this.tokenHeader
                  }
                })
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.nextStep = true
                  _this.active++
                  _this.checked = false
                  _this.albumForm.albumId = res.data.data
                  this.loadingAblum = false
                } else {
                  this.loadingAblum = false
                  alert('提交失败，请稍后再试!')
                  return false
                }
              })
              .catch(() => {
                /* this.loadingAblum = false
                this.$message.error(err) */
              })
          }
        } else {
          this.$message.error('提交失败!!')
          return false
        }
      })
    },
    // 校验并且给表单中的文件赋值
    beforeUpLrc (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const extension = fileType === 'lrc'
      if (!extension) {
        this.$message({
          message: '歌词文件只能是lrc格式！请重选！',
          type: 'error'
        })
        this.$refs.lrcupload.clearFiles()
      } else {
        this.isLrc = true
      }
      this.lycFile = file.raw
    },
    beforeUpImg (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      if (fileType !== 'png' && fileType !== 'jpg') {
        this.$message({
          message: '上传文件只能是png,jpg格式！请重选！',
          type: 'error'
        })
        this.$refs.imgupload.clearFiles()
      } else {
        this.isImg = true
      }
      this.coverFile = file.raw
    },
    beforeUpMp3 (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const extension = fileType === 'mp3' && 'wav'
      if (!extension) {
        this.$message({
          message: '上传文件只能是mp3,wav格式！请重选！',
          type: 'error'
        })
        this.$refs.musicupload.clearFiles()
      } else {
        this.isMp3 = true
      }
      this.musicFile = file.raw
    },
    // 文件预览图
    imgPreview (file, fileList) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.posterURL = URL.createObjectURL(file.raw)
        // 获取当前改变的文件信息
        this.coverFile = file.raw
      } else {
        this.$message.error('请选择图片文件')
      }
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    // 上传之后询问是否上传 （可以不使用计算属性 每次请求时的data都是不同的）
    uploadMusic () {
      this.$refs.songForm.validate((valid) => {
        let _this = this
        if (valid) {
          if (confirm('确认提交吗？')) {
            if (!_this.isImg || !_this.isLrc || !_this.isMp3) {
              this.$message({
                message: '请确认即将提交的三个文件格式！！',
                type: 'error'
              })
              return false
            } else {
              this.loadingSong = true
            }
            let musicForm = new FormData()
            let domain = _this.domain + '/'
            musicForm.append('songFile', _this.musicFile)
            let cover = this.coverFile
            let coverForm = new FormData()
            coverForm.append('file', cover)
            coverForm.append('token', _this.upToken)
            this.$axios({
              // 上传封面文件
              method: 'post',
              url: 'http://upload.qiniup.com/',
              data: coverForm
            }).then(res => {
              // 获取单曲封面
              let hash = res.data.hash
              let lycForm = new FormData()
              _this.albumForm.cover = domain + hash
              lycForm.append('lyricsFile', _this.lycFile)
              return _this.$axios({
                // 上传歌词文件
                method: 'post',
                url: 'http://175.24.83.13:8000/singer/upLyr',
                data: lycForm,
                withCredentials: true,
                processData: false,
                headers: {
                  'Authorization': this.tokenHeader
                }
              })
            })
              .then(res => {
                // 获取音乐歌词
                if (res.data.code === 1) {
                  let musicForm = new FormData()
                  _this.albumForm.lyrics = res.data.data
                  musicForm.append('file', _this.musicFile)
                  musicForm.append('token', _this.upToken)
                  return _this.$axios({
                    // 上传歌词文件
                    method: 'post',
                    url: 'http://upload.qiniup.com/',
                    data: musicForm
                  })
                }
              })
              .then(res => {
                let hash = res.data.hash
                _this.albumForm.audio = domain + hash
                return _this.$axios({
                  // 上传整合表单
                  method: 'get',
                  url: 'http://175.24.83.13:8000/singer/subUpSong',
                  params: _this.albumForm,
                  withCredentials: true,
                  headers: {
                    'Authorization': this.tokenHeader
                  }
                })
              })
              .then(res => {
                if (res.data.code === 1) {
                  this.loadingSong = false
                  if (confirm('恭喜你完成上传，是否继续上传专辑歌曲？')) {
                    // 清空部分表单
                    _this.albumForm.songName = ''
                    this.$refs.musicupload.clearFiles()
                    this.$refs.lrcupload.clearFiles()
                    this.$refs.imgupload.clearFiles()
                    return false
                  } else {
                    _this.nextStep = true
                    _this.active++
                  }
                } else {
                  this.loadingSong = false
                  this.$message.error('上传失败，请重试！不要刷新页面！')
                }
              })
              .catch(() => {
                this.loadingSong = false
                this.$message.error('上传失败，请重试！不要刷新页面！')
              })
          }
        } else {
          this.loadingSong = false
          this.$message.error('提交失败，请重试！')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    nextclick1 () {
      if (this.active++ > 2) this.active = 0
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
  computed: {
    // 上传时载入图的管理
    loadingSong1 () {
      return this.loadingSong
    },
    loadingAblum1 () {
      return this.loadingAblum
    }
  },
  mounted () {
    let _this = this
    _this.$axios.create({
      withCredentials: false
    })
    this.click = true
    this.tokenHeader = 'Bearer ' + localStorage.getItem('Authorization')
    this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          return config
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
    _this.$axios({
      method: 'post',
      url: 'http://175.24.83.13:8000/singer/getUpToken',
      headers: {
        'Authorization': this.tokenHeader
      }
    })
      .then(res => {
        this.upToken = res.data.upToken
        this.domain = res.data.domain
      })
    // 设置是否vip专属
    if (this.$route.meta.isNormol) {
      this.albumCate = '编辑普通专辑信息'
      this.albumForm.isvip = 0
      this.ruleForm.isVip = 0
    } else {
      this.albumCate = '编辑数字专辑信息'
      this.albumForm.isvip = 1
      this.ruleForm.isVip = 1
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/createcentre/main/firstpage.scss";
</style>
