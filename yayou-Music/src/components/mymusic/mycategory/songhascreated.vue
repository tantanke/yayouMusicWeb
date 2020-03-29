<template>
  <div class="mysonglist">
    <el-row class="title">
      <div class="song-list">
        <i class="el-icon-plus"></i>
        <span @click="dialogCoverVisible = true">新建歌单</span>
        <el-dialog
          title="歌单封面"
          center
          :visible.sync="dialogCoverVisible"
          width="50%"
          :append-to-body="true">
          <el-form :model="form" class="upload-cover">
            <el-form-item label="">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action="#"
                :limit="1"
                :auto-upload="false"
                :headers="tokenHeader"
                :on-success="handleAvatarSuccess"
                :on-change="handleOnChange"
                :before-upload="beforeAvatarUpload"
                title="点击上传图片"
                v-loading="loadingCover"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <img v-if="coverUrl" :src="coverUrl" class="avatar">
                <div v-else>
                  <i class="el-icon-plus avatar-uploader-icon"></i><span >选择一张本地图片</span>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="uploadCover">立即上传</el-button>
            <el-button @click="dialogCoverVisible = false; dialogFormVisible = true" :disabled="disabled" title="图片上传才能点击">下一步</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="歌单上传"
          center
          :visible.sync="dialogFormVisible"
          width="50%"
          :append-to-body="true">
          <el-form :model="formData" ref="songForm">
            <el-form-item label="歌单名字" :label-width="formLabelWidth">
              <el-input v-model="formData.name" autocomplete="off" placeholder="小于10字" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="歌单介绍" :label-width="formLabelWidth" >
              <el-input v-model="formData.introduce" autocomplete="off" placeholder="小于140字" maxlength="140"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="submitSonglist(formData)">上传歌单</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="led-songlist">
        <i class="el-icon-upload2"></i>
        <span>导入歌单</span>
      </div>
    </el-row>
    <el-row>
      <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column label="歌单" width="700">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <router-link :to="{name: 'songlistdetail', params:{songlistid: scope.row.id}}" tag="span" style="margin-left: 10px;cursor:pointer">
              {{ scope.row.songlist }}
              </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="songnum" label="曲目数" width="150"></el-table-column>
        <el-table-column label="收听" width="150">
          <template slot-scope="scope">
            <i class="el-icon-plus"></i>
            <span style="margin-left: 10px">{{ scope.row.listen }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as qiniu from 'qiniu-js'
export default {
  data () {
    return {
      loadingCover: false,
      disabled: true,
      urls: {
        uploadSonglist: 'http://175.24.83.13:8000/user/createSongList',
        getUpToken: 'http://175.24.83.13:8000/getUpToken',
        qiNiuYun: 'http://upload.qiniup.com/'
      },
      form: {
        file: ''
      },
      domain: '',
      upToken: '',
      tokenHeader: null,
      upProgress: '', // 作为计算属性的载体
      config: {useCdnDomain: true, region: qiniu.region.z0},
      putExtra: {
        fname: '',
        params: {},
        mimeType: null
      },
      songTableData: [
        {
          id: '001',
          imgUrl1: 'static/image/发布作品.jpg',
          songlist: '我喜欢',
          songnum: '面朝大海',
          listen: ''
        },
        {
          imgUrl1: 'static/image/发布作品.jpg',
          songlist: '我hgj',
          songnum: '面朝大海',
          listen: ''
        },
        {
          songlist: '我喜欢',
          songnum: '3首',
          listen: '南瑶乐队'
        },
        {
          songlist: '我喜欢',
          songnum: '3首',
          listen: '南瑶乐队'
        }
      ],
      dialogCoverVisible: false,
      dialogFormVisible: false,
      formData: {
        name: '',
        cover: '',
        introduce: ''
      },
      cover: '',
      coverUrl: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    cancelForm () {
      this.$refs.songForm.clearFiles()
      this.dialogFormVisible = false
    },
    handleAvatarSuccess (res, file) {
    },
    handleOnChange (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.coverUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      let _this = this
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isJPG) {
        _this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        _this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        console.log(file)
        _this.loadingCover = true
        _this.cover = file
        let cover = new FormData()
        cover.append('file', file)
        cover.append('token', _this.upToken)
        axios({
          url: _this.urls.qiNiuYun,
          method: 'post',
          data: cover
        })
          .then(res => {
            console.log('res')
            console.log(res)
            _this.disabled = false
            let hash = res.data.hash
            let domain = _this.domain + '/'
            _this.coverUrl = 'http://' + domain + hash
            _this.loadingCover = false
          })
          .catch(err => {
            console.log(err)
          })
      }
      return isJPG && isLt2M
    },
    uploadProgress () {
      return '请不要刷新或关闭页面，已上传:%' + this.upProgress
    },
    uploadCover () {
      this.$refs.upload.submit()
      this.disabled = false
    },
    submitSonglist (formData) {
      let _this = this
      let coverName = _this.cover.name
      let coverFile = _this.cover
      let observer = {
        next (res) {
          _this.upProgress = res.total.percent.toFixed(2)
        },
        error (err) {
          console.log(err)
        },
        complete (res) {
          console.log(res)
          let hash = res.hash
          let coverUrl = _this.domain + '/' + hash
          let formdata = new FormData()
          formdata.append('cover', coverUrl)
          formdata.append('introduce', formData.introduce)
          formdata.append('songListName', formData.name)
          axios({
            url: _this.urls.uploadSonglist,
            method: 'post',
            headers: {
              'Authorization': _this.tokenHeader
            },
            data: formdata
          })
            .then(res => {
              console.log('res')
              console.log(res)
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: res.data.data
                })
                this.$refs.songForm.clearFiles()
                this.dialogFormVisible = false
                console.log('创建成功')
              }
              this.dialogFormVisible = false
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
      let observable = qiniu.upload(coverFile, coverName, this.upToken, this.putExtra, this.config)
      observable.subscribe(observer)
    }
  },
  mounted () {
    axios.create({
      withCredentials: false
    })
    this.tokenHeader = {'Authorization': 'Bearer ' + localStorage.getItem('Authorization')}
    axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          return config
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
    console.log('1561465')
    axios({
      method: 'post',
      url: this.urls.getUpToken,
      headers: {
        'Authorization': this.tokenHeader
      }
    }).then(res => {
      this.upToken = res.data.upToken
      this.domain = res.data.domain
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mymusic/mycategory/songhascreated.scss";
</style>
