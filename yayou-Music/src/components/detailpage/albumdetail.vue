<template>
  <div class="songlist">
    <el-row>
      <el-col :span="10" offset="7">
        <el-row>
          <el-col :span="8" offset="1">
            <img :src="songlistinfo.imgUrl" class="img"/>
          </el-col>
          <el-col :span="14" class="head-info">
            <div :model="songlistinfo.songlistname" class="songlistname"><span>{{songlistinfo.songlistname}}</span></div>
            <div :model="songlistinfo.createdtime" class="createdtime"><span>{{songlistinfo.createdtime}}&nbsp;创建</span></div>
            <div class="icon">
              <i class="el-icon-collection-tag"  title="收藏歌单"></i>
              <i class="el-icon-share" title="分享歌单"></i>
            </div>
            <el-row tag="div" class="tags">
              <el-col :span="3">标签：</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="25" class="tagi" v-for="(item,index) in songlistinfo.tags" :key="index" tag="span">{{item.tagi}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row tag="div" class="intro">
              <el-col :span="4" >介绍：</el-col>
              <el-col :span="20" tag="span" class="spani">
               thbfgngdbvn
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="function">
          <el-col :span="4" class="playall">
            <i v-if="playShow" class="el-icon-video-play" title="播放全部" @click="playAll"><span>播放全部</span></i>
            <i v-else class="el-icon-video-pause" title="暂停播放" @click="playPause"><span>暂停播放</span></i>
          </el-col>
          <el-col :span="5" :model="songlistinfo.songnumber">曲目数：{{songlistinfo.songnumber}}</el-col>
          <el-col :span="3" offset="12" :model="songlistinfo.playnumber">播放：{{songlistinfo.playnumber}}次</el-col>
        </el-row>
        <el-table
          :data="tableData"
          stripe="true">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            label="曲目标题"
            width="300">
            <template slot-scope="scope" >
              <router-link :to="{name:'songdetail', params:{songid: scope.row.songId}}" tag="span" >
                {{scope.row.title}}
              </router-link>
              <i class="el-icon-video-play" title="播放"></i>
              <i class="el-icon-video-pause" title="暂停"></i>
              <i :class="{'el-icon-collection-tag': show, 'collection-style': scope.row.collectionStyle}"  title="收藏" @click="handleCollection(scope.row)"></i>
              <i class="el-icon-share" title="分享"></i>
              <i class="el-icon-download" title="下载"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="时长"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="歌手"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.singer}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="专辑"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.columni}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            width="500">
            <template slot-scope="scope">
              <span :class="{'iconfont icon-dianzan': show, 'agree-style': scope.row.agreeStyle}"  @click="handleSongAgree(scope.row)" title="赞" ref="agree" ></span>
              <span>{{scope.row.agreeNum}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="pagination">
      <el-col :span="6" :offset="10"><el-pagination background layout="prev, pager, next" :total="40"></el-pagination></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
// axios.defaults.headers.delete['Content-Type'] = 'text/plain'
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
      urls: {
        collectionMusic: '/api/user/addMusicToCollection',
        discollectionMusic: '/api/user/unCollectSong',
        songAgreeUrl: '/api/user/likeSong',
        songDisagreeUrl: '/api/user//cancelLike'
      },
      playShow: true,
      show: true,
      userInfo: {
        id: '45',
        username: '123',
        userHeadImg: require('../../assets/img/homePage/狂徒(dts版).png')
      },
      songlistinfo: {
        id: '0001',
        username: '',
        imgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
        songlistname: '歌单名',
        createdtime: '创建时间',
        songnumber: '50',
        playnumber: '5',
        tags: [{tagi: '华语vbfg'}, {tagi: '流行'}, {tagi: '治愈'}]
      },
      tableData: [{
        songId: '000',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '2',
        agreeStyle: false,
        collectionStyle: false
      }, {
        songId: '001',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '25',
        agreeStyle: false,
        collectionStyle: true
      }, {
        songId: '002',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '2',
        agreeStyle: false,
        collectionStyle: false
      }, {
        songId: '003',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '2',
        agreeStyle: false,
        collectionStyle: false
      }, {
        songId: '004',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '2',
        agreeStyle: false,
        collectionStyle: false
      }, {
        songId: '005',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '2',
        agreeStyle: false,
        collectionStyle: false
      }, {
        songId: '006',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩',
        agreeNum: '',
        agreeStyle: false,
        collectionStyle: false
      }]
    }
  },
  methods: {
    playAll () {
      this.playShow = !this.playShow
    },
    playPause () {
      this.playShow = !this.playShow
    },
    handleCollection (e) {
      e.collectionStyle = !e.collectionStyle
      if (e.agreeStyle) {
        tAxios.post(this.urls.collectionMusic, qs.stringify(e.songId))
          .then(res => {
            console.log(res)
            if (res.data.code === '1') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        tAxios.request({
          url: this.urls.discollectionMusic,
          method: 'post',
          params: {
            _method: 'delete'
          },
          songId: qs.stringify(e.songId)})
          .then(res => {
            console.log(res)
            if (res.data.code === '1') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              e.agreeNum--
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleSongAgree (e) {
      e.agreeStyle = !e.agreeStyle
      if (e.agreeStyle) {
        tAxios.post(this.urls.songAgreeUrl, qs.stringify(e.songId))
          .then(res => {
            console.log(res)
            if (res.data.code === '1') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              e.agreeNum++
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        tAxios.request({
          url: this.urls.songDisagreeUrl,
          method: 'post',
          params: {
            _method: 'delete'
          },
          songId: qs.stringify(e.songId)})
          .then(res => {
            console.log(res)
            if (res.data.code === '1') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              e.agreeNum--
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    successMessage (msg) {
      console.log(msg)
    },
    errorMessage (msg) {
      console.log(msg)
    },
    wordNumberi () {
      var _this = this
      var l = 0
      var L = _this.$refs.count.value.split('').join('')
      for (var i = 0; i < L.length; i++) {
        if (L[i] === ' ') {
        } else if (L[i] === '\n') {
        } else {
          l++
        }
      }
      _this.comment.wordNumber = l
    }
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1609227_aoyxcedssdg.css');
@import '@/assets/css/mymusic/songlistdetail.scss';
</style>
