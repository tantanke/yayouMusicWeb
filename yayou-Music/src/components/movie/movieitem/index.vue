<template>
  <div class="moviedetails">
    <el-row class="aboutvideo">
      <el-row class="movievideo">
        <video
        id="myVideo"
        class="video-js"
        >
        <source
            src="http://q3zu4kbb9.bkt.clouddn.com/5-2 买家商品-service~1-1578923685075.mp4"
            type="video/mp4"
        >
        </video>
        <el-row class="videoinfo1">
            <el-row class="info">
              <el-col :span="21">21</el-col>
              <el-col :span="3">3</el-col>
            </el-row>
        </el-row>
        </el-row>
      </el-row>
      <el-row class="mostlike">
          大部分人爱看
        </el-row>
        <el-row class="videoinfo2">
          视频信息
        </el-row>
        <el-row class="expressvideoremark">
          发表评论
        </el-row>
        <el-row class="lookvideoremark">
          查看评论
        </el-row>
        <el-row class="remarkothers">
          评论他人
        </el-row>
      </div>
</template>

<script>
/* import * as videoplayer from '../../../../static/qiniuvideo' */
export default {
  name: 'TestTwo',
  mounted () {
    this.initVideo()
  },
  beforeDestroy () {
    this.$parent.$refs.allmovie.style.display = 'block'
  },
  methods: {
    initVideo () {
      // 初始化视频方法
      // eslint-disable-next-line no-undef
      let myPlayer = this.$video(myVideo, {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        autoplay: true,
        muted: false,
        // 自动播放属性,muted:静音播放
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: 'auto',
        // 设置视频播放器的显示宽度（以像素为单位）
        width: '1280px',
        // 设置视频播放器的显示高度（以像素为单位）
        height: '500px'
      })
      console.log(myPlayer)
    }
  }
}
</script>

<style>

</style>
