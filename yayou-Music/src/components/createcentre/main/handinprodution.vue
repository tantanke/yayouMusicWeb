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
            <el-form-item label="歌曲名"  prop='songName'>
              <el-input v-model="albumForm.songName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名" prop='artist'>
              <el-input v-model="albumForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="已有专辑名" prop='albumId'>
              <el-select v-model="albumForm.albumId" placeholder="请选择已发布专辑">
                <el-option v-for="(item,index) in hasAlbum " :key="index" :label="item.albumName" :value="item.albumId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="音频文件(mp3,wav)">
              <el-upload
              ref="musicupload"
              action="none"
              :auto-upload="false"
              :on-change='checkTypeMusic'
              :limit='1'>
              <el-button slot="trigger"  type="primary" >选取音频文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="歌词文件(lrc)" >
              <el-upload
              ref="lrcupload"
              action="none"
              :on-change='checkTypeLrc'
              :auto-upload="false"
              :limit='1'>
              <el-button slot="trigger"  type="primary" >选取歌词文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="封面文件">
              <el-upload
              ref="imgupload"
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
              ref="movieupload"
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
      hasAlbum: [],
      videoFile: '',
      coverFile: '', // 记录封面文件
      musicFile: '', // 记录音乐文件
      lycFile: '', // 记录歌词文件
      hasAblumName: '',
      albumForm: {
        'songName': '',
        'artist': '',
        'cover': '', // 用户上传音乐封面 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
        'isvip': '',
        'audio': '',
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
        albumId: [
          { required: true, message: '请选择是否为vip', trigger: 'change' }
        ],
        isAlbum: [
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
      domain: '',
      upToken: '',
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
        this.$refs.musicupload.clearFiles()
        this.$refs.lrcupload.clearFiles()
        this.$refs.imgupload.clearFiles()
      } else {
        this.dialogFormAblum = true
      }
    },
    // 文件axios请求均成功之后整合表单提交
    checkTypeLrc (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = fileType === 'lrc'
      if (!extension) {
        this.$message({
          message: '歌词文件只能是lrc格式！请重选！',
          type: 'error'
        })
        this.$refs.lrcupload.clearFiles()
        return false
      } else {
        this.isLrc = true
      }
      this.lycFile = file.raw
    },
    checkTypeCover (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isLt4M = file.size / 1024 / 1024 < 4
      if (fileType !== 'png' && fileType !== 'jpg') {
        this.$message({
          message: '封面文件只能是png，jpg格式！请重选！',
          type: 'error'
        })
        this.$refs.imgupload.clearFiles()
        return false
      }
      if (!isLt4M) {
        this.$message.error('上传图片大小不能超过 4MB!')
        this.$refs.imgupload.clearFiles()
        return false
      } else {
        this.isImg = true
      }
      this.coverFile = file.raw
    },
    checkTypeMusic (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileType !== 'mp3' && fileType !== 'wav') {
        this.$message({
          message: '上传文件只能是mp3或wav格式！请重选！',
          type: 'error'
        })
        this.$refs.musicupload.clearFiles()
        return false
      } else {
        this.isMp3 = true
      }
      this.musicFile = file.raw
    },
    confirmForm () {
      this.$refs.albumForm.validate((valid) => {
        let _this = this
        if (valid) {
          _this.hasAlbum.forEach((item, index) => {
            let id = item
            if (id.albumId === _this.albumForm.albumId) {
              _this.albumForm.isvip = id.isvip
              return true
            }
          })
          if (confirm('确认提交吗？')) {
            _this.uploadFileMusic()
          }
        } else {
          return false
        }
      })
    },
    uploadFileMusic () {
      let _this = this
      if (!_this.isLrc || !_this.isImg || !_this.isMp3) {
        this.$message.error('请确认文件格式！')
        this.loadingVideo = false
        return false
      }
      _this.isMp3 = false
      _this.isImg = false
      _this.isLrc = false
      _this.loadingMusic = true
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
            this.$message.success('上传成功')
          } else {
            this.$message.error('上传失败，请稍后再试！')
          }
          // 重置表单
          this.loadingMusic = false
          this.dialogFormAblum = true
          this.$refs.musicupload.clearFiles()
          this.$refs.lrcupload.clearFiles()
          this.$refs.imgupload.clearFiles()
          _this.albumForm.songName = ''
          _this.albumForm.artist = ''
        })
        .catch(err => {
          console.log(err)
          this.loadingMusic = false
          this.dialogFormAlbum = false
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
      const isLt5g = file.size / 1024 / 1024 < 5 * 1024
      const extension = fileType === 'mp4'
      if (!extension) {
        this.$message({
          message: '上传文件只能是mp4格式！请重选！',
          type: 'error'
        })
        this.$refs.movieupload.clearFiles()
        return false
      }
      if (!isLt5g) {
        this.$message.error('上传头像图片大小不能超过 5g!')
        return false
      } else {
        this.isMp4 = true
      }
      this.videoFile = file
      return extension
    },
    // 先上传视频拿到连接后 整合表单发送 有一步错就全错
    uploadFileVideo () {
      let _this = this
      if (!_this.isMp4) {
        this.$message.error('请确认文件格式！')
        this.loadingVideo = false
        return false
      }
      _this.isMp4 = false
      let upVideoForm = new FormData()
      upVideoForm.append('file', _this.videoFile.raw)
      upVideoForm.append('token', _this.upToken)
      _this.loadingVideo = true
      _this.$axios({
        method: 'post',
        url: 'http://upload.qiniup.com/',
        data: upVideoForm
      })
        .then(res => {
          console.log(res)
          let hash = res.data.hash
          let videoFormData = {}
          videoFormData.videoUrl = _this.domain + hash
          videoFormData.videoName = _this.videoForm.videoName
          videoFormData.videoDes = _this.videoForm.videoDes
          videoFormData.artist = _this.videoForm.artist
          videoFormData.isvip = _this.videoForm.isvip
          return _this.$axios({
            method: 'GET',
            url: 'http://175.24.83.13:8000/singer/subMv',
            params: videoFormData,
            withCredentials: true,
            headers: {
              'Authorization': this.tokenHeader
            }
          })
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$message.success('上传成功')
            _this.videoForm.videoName = ''
            _this.videoForm.videoDes = ''
            _this.videoForm.artist = ''
            _this.videoForm.isvip = ''
            _this.videoForm.videoUrl = ''
          } else {
            this.$message.error('上传失败，请稍后再试！')
          }
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
    }).then(res => {
      this.upToken = res.data.upToken
      this.domain = res.data.domain
    })
    _this.$axios({
      method: 'get',
      url: 'http://175.24.83.13:8000/singer/getAlbum',
      params: {pageNum: 1},
      withCredentials: true,
      headers: {
        'Authorization': this.tokenHeader
      }
    }).then(res => {
      // 获取所有专辑信息
      res.data.data.list.forEach((item, index) => {
        let e = {}
        e.albumId = item.albumId
        e.albumName = item.albumName
        e.isvip = item.isVip
        _this.hasAlbum.push(e)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/handinprodution.scss";
</style>
