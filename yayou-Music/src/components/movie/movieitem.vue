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
              <el-col :span="20">
                <span class="videoname">{{videoData.videoName}}</span>
                <span class="numbers">播放量：{{videoData.watch}}</span>
              </el-col>
              <el-col :span="4" class="videobuttons">
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
        userPlayMv: 'http://175.24.83.13:8000/user/playMv'
      },
      videoInfo: {
        videoId: '001',
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
      e.collectionStyle = !e.collectionStyle
      if (e.collectionStyle) {
        this.$axios.post(this.urls.collection, JSON.stringify({videoId: e.videoId}))
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
        this.$axios({
          url: this.urls.discollection,
          method: 'post',
          params: {
            _method: 'delete'
          },
          videoId: e.videoId
        })
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
      }
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
        mvUrl = _this.urls.userPlayMv
      } else if (isvip === 1) {
        alert('请登录')
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
    }
  }
}
</script>

<style lang="scss">
 .collection-style::before{
    font-size: 28px;
    line-height: 28px;
    color: #FF4752;
  }
</style>
