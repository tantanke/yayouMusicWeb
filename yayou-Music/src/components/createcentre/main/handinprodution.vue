<template>
  <div class="compose-class">
    <div class="compose-class-header"><p>创作类型</p><el-divider></el-divider></div>
    <div class="compose-class-main">
      <div>
        <router-link tag="div" :to="{name:'createalbum'}" class="compose-common-produce common-style-one" @mouseenter.native="changeNormol">
        <img src="../../../assets/img/homePage/normole.png" alt="">
      </router-link>
      <router-link @mouseenter.native="changeShuzi" tag="div" :to="{name:'createalbum'}" class="compose-number-produce common-style-one" >
          <img src="../../../assets/img/homePage/shuzie.png" alt="">
      </router-link>
      </div>
      <div class="upButtons">
        <el-button  @click="getAblumData"><i class="el-icon-plus"></i>上传作品至已发布专辑</el-button>
        <el-button  @click="dialogFormDraft"><i class="el-icon-plus"></i>上传至草稿箱</el-button>
        <el-button  @click="dialogFormVideo = true" @mouseenter="resetForm"><i class="el-icon-plus"></i>上传视频</el-button>
      </div>
      <!--上传作品至已发布专辑表单 -->
        <el-dialog title="上传作品至已发布专辑" :visible.sync="dialogFormAblum" :show-close='false' :close-on-click-modal='false' :close-on-press-escape='false'>
          <el-form :model="albumForm" :rules='musicRules' ref="albumForm" v-loading="loadingMusic" element-loading-text="努力上传中,请不要关闭或刷新页面！"
    element-loading-spinner="el-icon-loading">
            <el-form-item label="已有专辑名">
              <el-input v-model="hasAblumName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="歌曲名"  prop='songName'>
              <el-input v-model="albumForm.songName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名" prop='artist'>
              <el-input v-model="albumForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否vip专属"  prop='isvip'>
              <el-select v-model="albumForm.isvip" placeholder="请选择视频权限">
                <el-option label="是" value="1"></el-option>
                <el-option label="不是" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="音频文件(mp3,wav)">
              <el-upload
              ref="uploadAblumMusic"
              action="none"
              :auto-upload="false"
              :on-change='checkTypeMusic'
              :limit='1'>
              <el-button slot="trigger"  type="primary" >选取音频文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="歌词文件(lrc)" >
              <el-upload
              ref="uploadAblumWord"
              action="none"
              :on-change='checkTypeLrc'
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary" >选取歌词文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="封面文件">
              <el-upload
              ref="uploadAblumCover"
              action="none"
              :auto-upload="false"
              :on-change='checkTypeCover'
              :limit='1'>
              <el-button slot="trigger"  type="primary" >选取封面文件</el-button>
              <div slot="tip" class="el-upload__tip">每种文件单次最多上传一个</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
            <el-button @click="confirmCancel2" style="margin-left:125px">取 消</el-button>
            <el-button type="primary" @click="confirmForm">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--上传作品至草稿箱 暂时禁用-->
        <el-dialog title="上传至草稿箱" :visible.sync="dialogFormDraft">
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormDraft = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormDraft = false">确 定</el-button>
          </div>
        </el-dialog>
        <!--上传作品至视频列表 -->
        <el-dialog title="上传视频作品" :visible.sync="dialogFormVideo" :show-close='false' :close-on-click-modal='false' :close-on-press-escape='false' :destroy-on-close='true'>
          <el-form  :model="videoForm" ref="videoForm" v-loading="loadingVideo" :rules="videoRules" element-loading-text="努力上传中，请不要刷新或关闭页面!"
    element-loading-spinner="el-icon-loading">
            <el-form-item label="视频名称" prop='videoName'>
              <el-input v-model="videoForm.videoName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名称" prop='artist'>
              <el-input v-model="videoForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否vip专属" prop='isvip'>
              <el-select v-model="videoForm.isvip" placeholder="请选择视频权限" >
                <el-option label="是" value="1"></el-option>
                <el-option label="不是" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="视频文件(mp4)">
              <el-upload
              ref="uploadVideo"
              action="none"
              :auto-upload="false"
              :on-change='checkTypeVideo'
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传视频相关文件，且单次最多上传一个</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频描述" prop='videoDes'>
              <el-input v-model="videoForm.videoDes" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item >
            <el-button @click="confirmCancel1">取 消</el-button>
            <el-button type="primary" @click="uploadVideoForm">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
    <div class="compose-class-footer" >发布原创demo到我的音乐电台</div>
  </div>
</template>

<script>
export default {
  name: 'ComposeClassContent',
  data () {
    return {
      videoForm: {
        'videoName': '',
        'videoDes': '',
        'artist': '',
        'isvip': '',
        'videoUrl': '' // 用户上传视频 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
      },
      videoFile: '',
      coverFile: '',
      hasAblumName: '',
      albumForm: {
        'songName': '',
        'artist': '',
        'cover': '', // 用户上传音乐封面 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
        'isvip': '',
        'file': '',
        'lyrics': '',
        'albumId': '' // 先获取用户当前已有专辑 然后加入选项中
      },
      videoRules: {
        videoName: [
          { required: true, message: '请输入视频名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        videoDes: [
          { required: true, message: '请输入视频描述', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        artist: [
          { required: true, message: '请输入视频作者', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        isvip: [
          { required: true, message: '请选择是否为vip', trigger: 'change' }
        ]
      },
      musicRules: {
        songName: [
          { required: true, message: '请输入视频名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        artist: [
          { required: true, message: '请输入视频作者', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        isvip: [
          { required: true, message: '请选择是否为vip', trigger: 'change' }
        ]
      },
      allAblums: [],
      isImg: false,
      isMp3: false,
      isLrc: false,
      isMp4: false,
      dialogTableVisible: false,
      dialogFormVideo: false,
      loadingVideo: false,
      loadingMusic: false,
      dialogFormDraft: false,
      dialogFormAblum: false,
      formLabelWidth: '140px',
      // 两个单独上传文件路径
      upProgress: '', // 作为计算属性的载体
      upLoadMusicUrl: '',
      getCoverUrl: '',
      getVideoUrl: '/singer/upVideo',
      uploadVideoUrl: '/singer/subMv',
      uploadCoverUrl: '/setCover',
      getAlbumUrl: '/getSingerAlbum',
      upSongUrl: '/singer/upSong'
    }
  },
  methods: {
    // 音乐表单相关
    getAblumData () {
      this.dialogFormAblum = true
    },
    // 获取专辑信息 来整合信息
    confirmCancel2 () {
      if (window.confirm('是否取消上传?')) {
        this.dialogFormAblum = false
      } else {
        this.dialogFormAblum = true
      }
    },
    // 文件axios请求均成功之后整合表单提交
    checkTypeLrc (file, fileList) {
      console.log(file.raw) // 这个才是文件
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = fileType === 'lrc'
      if (!extension) {
        this.$message({
          message: '歌词文件只能是lrc格式！请删除后重选！',
          type: 'error'
        })
      } else {
        this.isLrc = true
      }
      this.albumForm.lyrics = file.raw
    },
    checkTypeCover (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType !== 'png' && fileType !== 'jpg') {
        this.$message({
          message: '封面文件只能是png，jpg格式！请删除后重选！',
          type: 'error'
        })
      } else {
        this.isMp3 = true
      }
      this.coverFile = file.raw
    },
    checkTypeMusic (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType !== 'mp3' && fileType !== 'wav') {
        this.$message({
          message: '上传文件只能是mp3格式！请删除后重选！',
          type: 'error'
        })
      } else {
        this.isImg = true
      }
      this.albumForm.file = file.raw
    },
    confirmForm () {
      this.$refs.albumForm.validate((valid) => {
        let _this = this
        let isHave = false
        if (valid) {
          if (confirm('确认提交吗？')) {
            let albumName = _this.hasAblumName
            _this.allAblums.forEach((item, index) => {
              if (albumName === item.albumName) {
                _this.albumForm.albumId = item.albumId
                isHave = true
                return false
              }
            })
            if (isHave) {
              console.log(_this.albumForm)
              _this.uploadFileMusic()
            } else {
              this.$message.error('请检查你的专辑名是否正确！！！')
            }
          }
        } else {
          console.log('提交失败，请重试！')
          return false
        }
      })
    },
    uploadFileMusic () {
      let cover = this.coverFile
      let coverForm = new FormData()
      coverForm.append('coverImage', cover)
      let _this = this
      if (!_this.isLrc || !_this.isImg || !_this.isMp3) {
        this.$message.error('请确认文件格式！')
        this.loadingVideo = false
        return false
      }
      _this.isMp3 = false
      _this.isImg = false
      _this.isLrc = false
      console.log(cover)
      _this.loadingMusic = true
      _this.$axios({
        method: 'post',
        url: '/singer/upVideo',
        data: coverForm,
        processData: false
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            console.log(res.data.data)
            _this.albumForm.cover = res.data.data
            console.log(_this.albumForm)
            let upSongForm = new FormData()
            upSongForm.append('songName', _this.albumForm.songName)
            upSongForm.append('artist', _this.albumForm.artist)
            upSongForm.append('cover', _this.albumForm.cover)
            upSongForm.append('isvip', _this.albumForm.isvip)
            upSongForm.append('file', _this.albumForm.file)
            upSongForm.append('lyrics', _this.albumForm.lyrics)
            upSongForm.append('albumId', _this.albumForm.albumId)
            return _this.$axios({
              method: 'post',
              url: _this.upSongUrl,
              data: upSongForm,
              processData: false
            })
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message.success('上传成功')
            _this.loadingMusic = false
          } else {
            this.$message.error('上传失败，请稍后再试！')
          }
          // 重置表单
          this.loadingVideo = false
          this.dialogFormVideo = false
          _this.albumForm.songName = ''
          _this.albumForm.artist = ''
        })
        .catch(err => {
          console.log(err)
          this.loadingVideo = false
          this.dialogFormVideo = false
        })
    },
    // 视频表单相关
    confirmCancel1 () {
      if (window.confirm('是否不在添加了?')) {
        this.dialogFormVideo = false
      } else {
        this.dialogFormVideo = true
      }
    },
    // 点击确定之后启用v-loading 完成后alert弹出
    checkTypeVideo (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = fileType === 'mp4'
      if (!extension) {
        this.$message({
          message: '上传文件只能是mp4格式！请删除后重选！',
          type: 'error'
        })
      } else {
        this.isMp4 = true
      }
      this.videoFile = file
      return extension
    },
    // 先上传视频拿到连接后 整合表单发送 有一步错就全错
    uploadFileVideo () {
      /* let videoForm = {'mvFile': '', 'isvip': ''} */
      let _this = this
      if (!_this.isMp4) {
        this.$message.error('请确认文件格式！')
        this.loadingVideo = false
        return false
      }
      _this.isMp4 = false
      let upVideoForm = new FormData()
      upVideoForm.append('mvFile', _this.videoFile.raw)
      console.log(upVideoForm.get('mvFile'), upVideoForm.get('isvip'))
      this.loadingVideo = true
      _this.$axios({
        method: 'post',
        url: _this.getVideoUrl,
        params: upVideoForm,
        processData: false
      })
        /* .then(res => {
          console.log(res)
          let videoFormData = {}
          videoFormData.videoName = _this.videoForm.videoName
          videoFormData.videoDes = _this.videoForm.videoDes
          videoFormData.artist = _this.videoForm.artist
          videoFormData.isvip = _this.videoForm.isvip
          videoFormData.videoUrl = '1'
          return _this.$axios({
            method: 'get',
            url: _this.uploadVideoUrl,
            params: videoFormData
          })
        }) */
        .then(res => {
          console.log(res)
          /* if (res.data.code === 1) {
            this.$message.success('上传成功')
            _this.videoForm.videoName = ''
            _this.videoForm.videoDes = ''
            _this.videoForm.artist = ''
            _this.videoForm.isvip = ''
            _this.videoForm.videoUrl = ''
          } else {
            this.$message.error('上传失败，请稍后再试！')
          } */
          // 重置表单
          this.loadingVideo = false
          this.dialogFormVideo = false
        })
        .catch(err => {
          console.log(err)
          this.loadingVideo = false
          this.dialogFormVideo = false
          this.$message.error('上传失败，请稍后再试！')
        })
    },
    uploadVideoForm () {
      this.$refs.videoForm.validate((valid) => {
        if (valid) {
          if (confirm('确认提交吗？')) {
            this.uploadFileVideo()
          }
        }
      })
    },
    // 判断创建的专辑类型
    changeShuzi () {
      this.$route.meta.isNormol = false
    },
    changeNormol () {
      this.$route.meta.isNormol = true
    },
    // 限定上传的文件类型 表单弹出通过监测自定义事件实现
    beforeUpToDraft () {
      alert('编辑草稿信息')
    },
    resetForm () {
      this.$refs.videoForm.resetFields()
    }
  },
  computed: {
    uploadProgress () {
      return '请不要刷新或关闭页面，已上传 ' + this.upProgress
    }
  },
  mounted () {
    // 拿到该歌手的全部专辑信息 方便上传歌曲到已有专辑
    // this.$axios.post(this.getVideoUrl, this.getAlbumUrl)
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
    _this.$axios.interceptors.request.use(
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
    _this.$axios.create({
      withCredentials: true
    })
    /*  _this.$axios({
      method: 'get',
      data: '',
      url: this.getAlbumUrl
    }).then(res => {
      // 获取所有专辑信息
      res.data.list.forEach((item, index) => {
        let e = {}
        e.albumId = item.albumId
        e.albumName = item.albumName
        _this.allAblums.push(e)
      })
      console.log(_this.allAblums)
    }).catch(err => {
      console.log(err)
    }) */
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/handinprodution.scss";
</style>
