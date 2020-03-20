<template>
  <div class="my-music">
      <ul class="mainList">
          <li tag='li' to=" "><span>推荐</span></li>
          <li tag='li'  to=" "><span>排行榜</span></li>
          <li tag='li'  to=" "><span>歌单</span></li>
          <router-link tag='li'  :to="{name:'personalCenter'}"><span>音乐分类</span></router-link>
          <router-link tag='li' :to="{name:'singerList'}"><span>歌手</span></router-link><!--动态路由 -->
      </ul>
      <el-row>
              <router-view></router-view>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import '@/assets/css/mymusic/index.scss';
</style>
