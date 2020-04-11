<template>
  <div class="moviedetails">
    <el-row class="aboutvideo">
      <el-row class="movievideo">
        <video
        id="myVideo"
        class="video-js"
        >
        <source
            ref="sourceUrl"
            :src="videoData.videoUrl"
            type="video/mp4"
        >
        </video>
        <el-row class="videoinfo1">
            <el-row class="info">
              <el-col :span="18">
                <span class="videoname">{{videoData.videoName}}</span>
                <span class="numbers">播放量：{{videoData.watch}}</span>
              </el-col>
              <el-col :span="6" class="videobuttons">
                <span class="videoZan">
                  <i v-if="videoInfo.isHasZan" @click="clickZan" class='iconfont icon-xinaixin1' title="为视频点赞"></i>
                  <i v-else @click="cancelZan" class='iconfont icon-xinaixin' title="取消点赞"></i>
                </span>
                <span><i :class="{'el-icon-share':show,'collection-style':videoInfo.shareStyle}"></i></span>
                <span><i :class="{'el-icon-edit-outline':show,'collection-style':videoInfo.editStyle}"></i></span>
                <span class="df"><i :class="{'el-icon-star-off':show,'collection-style':videoInfo.collectionStyle}" title="收藏" @click="handleCollection(videoInfo)"></i></span>
              </el-col>
            </el-row>
        </el-row>
        </el-row>
      </el-row>
      <el-row class="mostlike">
          <p>大部分人爱看</p>
          <el-row class="likecards" >
            <div class="likecard" v-for="index in 5" :key="index">
              <img src="./../../assets/img/homePage/themoonandthewell.png" alt="">
              <p>The moon on the wall</p>
              <span>山鹰组合</span>
              <span><i class="el-icon-video-camera"></i>102万</span><i></i>
            </div>
          </el-row>
        </el-row>
        <el-row class="videoinfo2">
         <p>视频简介</p>
         <span>Maroon 5</span>
         <span>发行时间：{{videoData.createTime}}</span>
        </el-row>
        <el-row class="expressvideoremark">
          <el-row><span class="title">评论</span><span class="numbers">共{{videoData.comment}}条评论</span></el-row>
          <el-row class="remarkarea">
          <el-input
          type="textarea"
          placeholder="说点什么吧"
          v-model="remarktextarea"
          maxlength="120"
          show-word-limit
          :rows="6"
          >
          </el-input>
          </el-row>
          <el-row class="remarkbutton">
            <div class="btn">发表评论</div>
            <div><i class="el-icon-orange"></i></div>
          </el-row>
        </el-row>
        <el-row class="lookvideoremark">
          <el-row class="allremarks">
            <el-row class="remarknums">
              <span>评论</span>
              2015条
            </el-row>
            <el-row class="remarkcard" v-for="index in 10" :key="index" >
              <el-col :span="1" class="userImg">
                <img src="./../../assets/img/homePage/彝人制造.png" alt="">
              </el-col>
              <el-col :span="23" class='info'>
                <p>悲伤那麽大</p>
                <p>邓紫棋唱歌也很好听啊</p>
                <el-row class="dateandbtn">
                     <el-col :span='21'>
                       <span class="remarkdate">2016-07-21 10:55:50</span>
                     </el-col>
                     <el-col :span='3'>
                      <div class="btn">
                       <i class="el-icon-star-on begood"></i><span>16</span>
                       <i class="el-icon-chat-dot-square remark"></i>
                     </div></el-col>
                </el-row>
                </el-col>
                <el-divider></el-divider>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="remarkothers">
           <el-row class="remarkarea">
          <el-input
          type="textarea"
          placeholder="说点什么吧"
          v-model="remarktextarea"
          maxlength="120"
          show-word-limit
          :rows="6"
          >
          </el-input>
          </el-row>
          <el-row class="remarkbutton">
            <div class="btn">发表评论</div>
            <div><i class="el-icon-orange"></i></div>
          </el-row>
        </el-row>
      </div>
</template>

<script>
/* import * as videoplayer from '../../../../static/qiniuvideo' */
import qs from 'qs'
export default {
  data () {
    return {
      remarktextarea: '',
      show: true,
      videoData: '',
      urls: {
        collection: 'http://175.24.83.13:8000/user/addVideoToCollection',
        discollection: 'http://175.24.83.13:8000/user/unCollectVideo',
        vipPlayMv: 'http://175.24.83.13:8000/vip/playMv',
        userPlayMv: 'http://175.24.83.13:8000/user/playMv',
        visitorPlayMv: 'http://175.24.83.13:8000/visitorPlayVideo'
      },
      videoInfo: {
        isHasZan: true,
        collectionStyle: false,
        shareStyle: false,
        editStyle: false
      }
    }
  },
  beforeDestroy () {
    this.$parent.$refs.allmovie.style.display = 'block'// 防止渲染出现问题
  },
  methods: {
    initVideo () {
      // 初始化视频方法
      // eslint-disable-next-line no-undef
      // 页面dom元素渲染完毕，执行回调里面的方法
      this.$nextTick(() => {
        let myPlayer = this.$video(document.getElementById('myVideo'), {
          // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          autoplay: false,
          muted: false,
          // 自动播放属性,muted:静音播放
          // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: 'auto',
          // 设置视频播放器的显示宽度（以像素为单位）
          width: '1240px',
          // 设置视频播放器的显示高度（以像素为单位）
          height: '500px'
        })
        console.log(myPlayer)
      })
    },
    // 收藏视频
    handleCollection (e) {
      if (!e.collectionStyle) {
        this.$axios.post(this.urls.collection, qs.stringify({videoId: this.videoData.videoId}))
          .then(res => {
            console.log(res)
            if (res.data.code === 1) {
              e.collectionStyle = !e.collectionStyle
            } else if (res.data.code === 20001) {
              alert('请先登录')
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$axios({
          url: this.urls.discollection,
          method: 'post',
          params: {
            _method: 'delete'
          },
          data: qs.stringify({videoId: this.videoData.videoId})
        })
          .then(res => {
            console.log(res)
            if (res.data.code === 1) {
              e.collectionStyle = !e.collectionStyle
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
    judgeZan () {
      let _this = this
      _this.$axios({
        method: 'get',
        url: '/user/videoIfLike',
        params: {videoId: _this.$route.params.movieid}
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.data.message === '已点赞') {
            _this.videoInfo.isHasZan = false
          } else {
            _this.videoInfo.isHasZan = true
          }
        }
      })
    },
    clickZan () {
      let _this = this
      _this.$axios({
        method: 'get',
        url: '/user/likeVideo',
        params: {videoId: _this.$route.params.movieid}
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.data === '点赞成功') {
            _this.videoInfo.isHasZan = false
          } else {
            _this.$message.error(res.data.msg)
            _this.videoInfo.isHasZan = true
          }
        } else if (res.data.code === 20001) {
          alert('请先登录')
        } else {
          _this.$message.error(res.data.msg)
        }
      })
    },
    cancelZan () {
      let _this = this
      _this.$axios({
        method: 'get',
        url: '/user/unLikeVideo',
        params: {videoId: _this.$route.params.movieid}
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.data === '取消点赞成功') {
            _this.videoInfo.isHasZan = true
          } else {
            _this.videoInfo.isHasZan = false
          }
        }
      })
    }
  },
  mounted () {
    let _this = this
    _this.$axios.create({
      withCredentials: true
    })
    if (localStorage.getItem('Authorization')) {
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
        // 通过this.$route.params.isvip获取是否vip
      )
      let mvUrl = ''
      let id = {
        videoId: _this.$route.params.movieid
      }
      let isvip = _this.$route.params.isvip
      console.log(id)
      if (isvip === 0) {
        mvUrl = _this.urls.userPlayMv
      } else if (isvip === 1) {
        mvUrl = _this.urls.vipPlayMv
      } else {
        mvUrl = _this.urls.userPlayMv
      }
      _this.$axios({
        url: mvUrl,
        method: 'get',
        withCredentials: true,
        params: id
      }).then(res => {
        let data = res.data
        if (data.code === 1) {
          _this.videoData = data.data
          _this.nowVideoUrl = data.data.videoUrl
          _this.$refs.sourceUrl.url = _this.nowVideoUrl
          console.log(_this.nowVideoUrl)
          _this.initVideo()
        }
      })
    } else {
      let mvUrl = ''
      let id = {
        videoId: _this.$route.params.movieid
      }
      let isvip = _this.$route.params.isvip
      console.log(id)
      if (isvip === 0) {
        mvUrl = _this.urls.visitorPlayMv
      } else if (isvip === 1) {
        alert('请登录')
      } else {
        mvUrl = _this.urls.visitorPlayMv
      }
      _this.$axios({
        url: mvUrl,
        method: 'get',
        withCredentials: true,
        params: id
      }).then(res => {
        let data = res.data
        if (data.code === 1) {
          _this.videoData = data.data
          _this.nowVideoUrl = data.data.videoUrl
          _this.$refs.sourceUrl.url = _this.nowVideoUrl
          console.log(_this.nowVideoUrl)
          _this.initVideo()
        }
      })
    }
    _this.judgeZan() // 判断视频是否点赞
  }
}
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_1609227_qw7fa8ylq3.css');//爱心icon
div{
  cursor: default;
}
.videobuttons{
  .videoZan{
    i{font-size: 22px; cursor: pointer;}
    .icon-xinaixin{
      color: #FF4752;
    }
  }
  .collection-style::before{
    font-size: 28px;
    line-height: 28px;
    cursor: pointer;
    color: #FF4752;
  }
}

</style>
