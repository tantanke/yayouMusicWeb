<template>
  <div class="mysonglist">
    <el-row class="title">
      <div class="song-list">
        <i class="el-icon-plus"></i>
        <span @click="dialogCoverVisible = true">新建歌单</span>
        <el-dialog title="歌单封面" center :visible.sync="dialogCoverVisible">
          <el-form :model="form" class="upload-cover">
            <el-form-item label="">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action="#"
                http-request=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                title="点击上传图片"
                v-loading="loadingCover"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else>
                  <i class="el-icon-plus avatar-uploader-icon"></i><span >选择一张本地图片</span>
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
              <el-button @click="dialogCoverVisible = false; dialogFormVisible = true" :disabled="disabled" title="图片上传才能点击">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog title="歌单上传" center :visible.sync="dialogFormVisible">
        <el-form :model="formData">
        <el-form-item label="歌单名字" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off" placeholder="小于10字" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="歌单介绍" :label-width="formLabelWidth" >
        <el-input v-model="formData.introduce" autocomplete="off" placeholder="小于140字" maxlength="140"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
let tAxios = axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  data () {
    return {
      loadingCover: false,
      imageUrl: '',
      disabled: true,
      urls: {
        uploadCover: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/setCover',
        uploadSonglist: 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/user/createSongList'
      },
      form: {
        file: ''
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
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.loadingCover = false
      this.imageUrl = URL.createObjectURL(file)
    },
    beforeAvatarUpload (file) {
      this.loadingCover = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadFile () {
      // this.$refs.upload.submit()
      this.disabled = false
      let formData = new FormData()
      formData.append('file', this.form.file)
      tAxios.post(this.urls.uploadCover,
        formData,
        {'Content-Type': 'multipart/form-data'}
      )
        .then(res => {
          console.log('res')
          console.log(res)
          if (res.data.code === 1) {
            this.formData.cover = res.data.data
            this.disabled = false
          } else if (res.data.code === '401') {
            localStorage.removeItem('Authorization')
            this.$router.push('/login')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitSonglist (formData) {
      tAxios.post(this.urls.uploadSonglist, JSON.stringify({
        cover: formData.cover,
        introduce: formData.introduce,
        songListName: formData.name
      }))
        .then(res => {
          console.log('res')
          console.log(res)
          if (res.data.code === 1) {
            console.log('上传成功')
          }
          this.dialogFormVisible = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mymusic/mycategory/songhascreated.scss";
</style>
