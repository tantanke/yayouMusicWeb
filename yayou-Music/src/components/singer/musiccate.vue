<template>
  <div class="music-categroy">
     <el-row>
        <ul class="cate-title">
          <li class="active"><span>口弦</span></li>
          <li><span>民歌</span></li>
          <li><span>高调</span></li>
          <li><span>克智尔朴</span></li>
          <li><span>流行</span></li>
          <li><span>电子</span></li>
          <li><span>摇滚</span></li>
          <li><span>嘻哈</span></li>
          <li><span>R&B</span></li>
        </ul>
      </el-row>
      <el-row class="songtitle">
        <div>
          <span class="title">音乐分类</span>
          <ul>
            <li class="hot">最热</li>
            <li class="new active">最新</li>
          </ul>
        </div>
      </el-row>
      <el-row class="category-cards">
        <div class="category-card" v-for="index in 30" :key="index">
          <img src="../../assets/img/homePage/图层27.png" alt="">
          <span>美妙口弦</span>
          <p>播放量：16.5万</p>
        </div>
      </el-row>
      <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="30" :pager-count="6" layout="prev, pager, next" :total="600"></el-pagination>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
