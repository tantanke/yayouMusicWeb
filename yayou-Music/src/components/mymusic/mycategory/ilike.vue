<template>
  <div class="ilike">
      <el-row class="title">
        <ul>
          <routerLink tag='li' :to="{name:'iLikeSong'}">歌曲<span>20</span></routerLink><!-- {{item 20}} -->
          <routerLink tag='li' :to="{name:'iLikeSongList'}">歌单<span>0</span></routerLink>
          <routerLink tag='li' :to="{name:'iLikeSEd'}">专辑<span>0</span></routerLink>
          <routerLink tag='li' :to="{name:'iLikeVideo'}">视频<span>0</span></routerLink>
        </ul>
      </el-row>
      <router-view></router-view>
      <!-- <el-row class="factor">
        2
      </el-row>
      <el-row class="list">
        3
      </el-row> -->
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
