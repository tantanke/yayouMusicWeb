<template>
  <div class="iLikeSong">
    <el-row>
      <ul class="buttons">
        <router-link :to="{name: 'myplaylist'}" tag="li" class="play">
          <i class="el-icon-video-play"></i>
          <span>播放</span>
        </router-link>
        <router-link :to="{name: 'mycollection'}" tag="li" class="have">
          <i class="el-icon-folder-opened"></i>
          <span>收藏</span>
        </router-link>
        <router-link :to="{name: 'myshare'}" tag="li" class="share">
          <i class="el-icon-position"></i>
          <span>分享</span>
        </router-link>
        <router-link :to="{name: 'myloading'}" tag="li" class="download">
          <i class="el-icon-download"></i>
          <span>下载</span>
        </router-link>
        <router-link :to="{name: 'mycomment'}" tag="li" class="remark">
          <i class="el-icon-edit-outline"></i>
          <span>评论</span>
        </router-link>
      </ul>
    </el-row>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
</style>
