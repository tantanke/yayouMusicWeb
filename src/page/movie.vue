<template>
    <div class='movie-info'>
    <div>
      <ul class="mainList">
        <li class="active"><span>推荐</span></li>
        <li><span>排行榜</span></li>
        <li><span>歌单</span></li>
        <li><span>音乐分类</span></li>
        <li><span>歌手</span></li>
      </ul>
    </div>
    <el-row>
     <el-row class="movieTitle">
      <el-col :span="1">
        <span>视频</span>
      </el-col>
      <el-col :span="23">
        <ul class="movieCate">
          <li tag='li' to=" ">祖国</li>
          <router-link  tag='li' :to="{name:'movieList'}">电影</router-link>
          <li tag='li' to=" ">科普</li>
          <li tag='li' to=" ">电视剧</li>
          <li tag='li' to=" ">体育</li>
          <li  tag='li' to=" ">综艺</li>
          <li  tag='li' to=" ">彝问</li>
          <li tag='li' to=" ">MV</li>
        </ul>
      </el-col>
    </el-row>
    </el-row>
    <el-row>
      <router-view></router-view>
    </el-row>
    </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/mymovie/index.scss";
</style>
