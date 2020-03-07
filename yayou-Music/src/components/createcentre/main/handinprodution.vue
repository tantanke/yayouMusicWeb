<template>
  <div class="compose-class">
    <div class="compose-class-header"><p>创作类型</p><el-divider></el-divider></div>
    <div class="compose-class-main">
      <div>
        <router-link tag="div" :to="{name:'createablum'}" class="compose-common-produce common-style-one" @mouseenter.native="changeNormol">
        <img src="../../../assets/img/homePage/normole.png" alt="">
      </router-link>
      <router-link @mouseenter.native="changeShuzi" tag="div" :to="{name:'createablum'}" class="compose-number-produce common-style-one" >
          <img src="../../../assets/img/homePage/shuzie.png" alt="">
      </router-link>
      </div>
      <div class="upButtons">
        <el-button  @click="dialogFormAblum = true"><i class="el-icon-plus"></i>上传作品至已发布专辑</el-button>
        <el-button  @click="dialogFormDraft"><i class="el-icon-plus"></i>上传至草稿箱</el-button>
        <el-button  @click="dialogFormVideo = true" @mouseenter="resetForm"><i class="el-icon-plus"></i>上传视频</el-button>
      </div>
      <!--上传作品至已发布专辑表单 -->
        <el-dialog title="上传作品至已发布专辑" :visible.sync="dialogFormAblum" :show-close='false' :close-on-click-modal='false' :close-on-press-escape='false'>
          <el-form :model="ablumForm">
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
            <el-form-item label="选择专辑" :label-width="formLabelWidth">
              <el-select v-model="ablumForm.albumId" placeholder="请选择专辑上传">
                <el-option label="专辑一" value="1"></el-option>
                <el-option label="专辑二" value="0"></el-option>
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmCancel2">取 消</el-button>
            <el-button type="primary" @click="uploadFileMusic">确 定</el-button>
          </div>
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
          <el-form :model="videoForm" ref="videoForm" v-loading="loadingVideo">
            <el-form-item label="视频名称" :label-width="formLabelWidth">
              <el-input v-model="videoForm.videoName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者名称" :label-width="formLabelWidth">
              <el-input v-model="videoForm.artist" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否vip专属" :label-width="formLabelWidth">
              <el-select v-model="videoForm.isvip" placeholder="请选择视频权限">
                <el-option label="是" value="1"></el-option>
                <el-option label="不是" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="视频文件" :label-width="formLabelWidth">
              <el-upload
              ref="uploadVideo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :data='videoForm.isVip'
              :auto-upload="false"
              :on-success='successUploadVideo'
              :on-error='errorUploadVideo'
              :on-change='checkTypeVideo'
              :limit='1'>
              <el-button slot="trigger"  type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传视频相关文件，且单次最多上传一个</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="视频描述" :label-width="formLabelWidth" >
              <el-input v-model="videoForm.videoDes" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
            <el-button @click="confirmCancel1">取 消</el-button>
            <el-button type="primary" @click="uploadFileVideo">确 定</el-button>
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
        videoName: '',
        videoDes: '',
        artist: '',
        isvip: '',
        videoUrl: '' // 用户上传视频 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
      },
      ablumForm: {
        songName: '',
        artist: '',
        cover: '', // 用户上传音乐封面 点击确定后 发送请求拿到url 把url设置进入表单后一起发送
        isvip: '',
        file: '',
        lyrics: '',
        albumId: '' // 先获取用户当前已有专辑 然后加入选项中
      },
      videoFormRule: {

      },
      dialogTableVisible: false,
      dialogFormVideo: false,
      loadingVideo: false,
      dialogFormDraft: false,
      dialogFormAblum: false,
      formLabelWidth: '120px',
      // 两个单独上传文件路径
      upLoadMusicUrl: '',
      getCoverUrl: '',
      getVideoUrl: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/upVideo',
      uploadVideoUrl: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/subMv'
    }
  },
  methods: {
    // 音乐表单相关
    confirmCancel2 () {
      if (window.confirm('是否取消上传?')) {
        this.dialogFormAblum = false
      } else {
        this.dialogFormAblum = true
      }
    },
    // 三个axios请求均成功之后整合表单提交
    checkTypeLrc (file, fileList) {
      console.log(file.raw) // 这个才是文件
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(fileType)
    },
    checkTypeCover (file, fileList) {
      console.log(file.raw) // 这个才是文件
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(fileType)
    },
    checkTypeMusic (file, fileList) {
      console.log(file.raw) // 这个才是文件
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(fileType)
    },
    uploadFileMusic () {
      alert('上传成功！！')
      this.dialogFormAblum = false
    },
    // 视频表单相关
    confirmCancel1 () {
      if (window.confirm('是否取消上传?')) {
        this.dialogFormVideo = false
      } else {
        this.dialogFormVideo = true
      }
    },
    // 点击确定之后启用v-loading 完成后alert弹出
    successUploadVideo (response, file) {
      if (response.code === 1) {
        this.videoForm.videoUrl = response.data
        let videoFormData = new FormData()
        videoFormData.append('videoName', this.videoName)
        videoFormData.append('videoDes', this.videoDes)
        videoFormData.append('artist', this.artist)
        videoFormData.append('isvip', this.isvip)
        videoFormData.append('videoUrl', this.videoUrl)
        this.$axios.post('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/singer/upVideo'
          , videoFormData).then(res => {
          if (res.code === 1) {
            this.loadingVideo = false
            alert('上传成功!')
            this.dialogFormVideo = false
          }
        })
          .catch(error => {
            console.log(error)
            this.loadingVideo = false
            alert('上传失败!请重试！')
            this.dialogFormVideo = false
          })
      } else {
        this.loadingVideo = false
        alert('上传失败!请重试！')
        this.dialogFormVideo = false
      }
      // 整合表单发送请求(使用formData)
    },
    errorUploadVideo () {
      this.loadingVideo = false
      alert('上传失败!请重试！')
      this.dialogFormVideo = false
    },
    checkTypeVideo (file, fileList) {
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(fileType)
    },
    // 先上传视频拿到连接后 整合表单发送 有一步错就全错
    uploadFileVideo () {
      this.loadingVideo = true
      this.$refs.uploadVideo.submit()
    },
    // 判断创建的专辑类型
    changeShuzi () {
      this.$route.meta.isNormol = false
    },
    changeNormol () {
      this.$route.meta.isNormol = true
    },
    // 限定上传的文件类型 表单弹出通过监测自定义事件实现
    beforeUpToAblum () {
      alert('hhhh')
    },
    beforeUpToDraft () {
      alert('编辑草稿信息')
    },
    beforeUpVideo () {
      alert('编辑视频信息')
    },
    resetForm () {
      this.$refs.videoForm.resetFields()
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/handinprodution.scss";
</style>
