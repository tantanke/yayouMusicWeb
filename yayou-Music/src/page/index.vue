<template>
  <div class="yy-mainContent">
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
        <hot-song/>
      </el-row>
      <el-row >
        <recommend/>
      </el-row>
      <el-row >
        <new-song/>
      </el-row>
      <el-row >
        <rank-list/>
      </el-row>
      <el-row >
        <hot-singer/>
      </el-row>
      <el-row >
        <hot-movie/>
      </el-row>
  </div>
</template>

<script>
import mainList from '@/components/header/mainList.vue'
import picContent from '@/components/main/picContent.vue'
import hotSong from '@/components/main/hotsong.vue'
import hotSinger from '@/components/main/hotsinger.vue'
import hotMovie from '@/components/main/hotmovie.vue'
import newSong from '@/components/main/newsong.vue'
import rankList from '@/components/main/ranklist.vue'
import recommend from '@/components/main/recommend.vue'
export default {
  components: {
    hotSong,
    hotSinger,
    hotMovie,
    rankList,
    recommend,
    newSong,
    picContent,
    mainList
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/main/index.scss'
</style>
