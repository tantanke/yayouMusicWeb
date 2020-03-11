<template>
  <div class="focus">
    <el-row>
      <el-col :span="2">
        <span class="singer active">歌手</span>
      </el-col>
      <el-col :span="18">
        <span class="user">用户</span>
      </el-col>
      <el-col :span="4">
        <div class="focusmore"><i class='el-icon-plus'></i><span>关注更多歌手</span></div>
      </el-col>
    </el-row>
    <el-row class="focuslist">
      <div>
        <div class="have" v-if="isHave">有</div>
        <div class='nothave' v-else>
        <img src="../../../assets/img/homePage/nofocus.png" alt="">
        <span>什么也没有,去看看</span><span class="hotsinger">热门歌手!</span>
      </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHave: false
    }
  }
}
</script>

<style>
</style>
