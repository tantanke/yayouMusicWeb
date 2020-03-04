<template>
  <div class="personal-center">
        <el-row>
           <div class="personal-back" style="background-image:url('../../../static/image/我的音乐.jpg')">
          <div class="user">
            <img src="../../assets/img/homePage/sliderPic.png" alt="">
            <div class="wodemusic"><span>我的音乐</span><i class="el-icon-ice-cream"></i></div>
            <div class="user-info">
              <ul >
                <li>
                  <div>0</div>
                  <span>创作</span>
                  </li>
                  <li><el-divider direction="vertical"></el-divider></li>
                <li>
                  <div>0</div>
                  <span>关注</span>
                </li>
                <li><el-divider direction="vertical"></el-divider></li>
                <li>
                  <div>0</div>
                  <span>粉丝</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </el-row>
        <el-row class="personal-category">
          <el-col :span='5'>
            <dl class="lefttable">
              <dt class="active"><span><i class="el-icon-menu"></i>音乐分类</span></dt>
              <router-link tag='dd' :to="{name:'iLike'}"><span>我喜欢</span></router-link>
              <router-link tag='dd' :to="{name:'songHasCreated'}"><span>创作的歌单</span></router-link>
              <router-link tag='dd' :to="{name:'iFocus'}"><span>关注</span></router-link>
              <router-link tag='dd' :to="{name:'iFans'}"><span>粉丝</span></router-link>
              <router-link tag='dd' :to="{name:'iHasVideo'}"><span>我上传的视频</span></router-link>
            </dl>
          </el-col>
          <el-col :span='19' class="righttable">
            <router-view></router-view>
          </el-col>
        </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mymusic/index.scss";
</style>
