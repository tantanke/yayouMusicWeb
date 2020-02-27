<template>
  <div class="numcate">
    <ul class="cate">
      <li>音乐</li>
      <li class="active">视频</li>
      <li>电台</li>
    </ul>
    <el-divider class="line"></el-divider>
    <div class="yesdata">
      <span>昨日数据</span>
      <ul>
        <li>
          <div>播放量</div>
          <div>8</div>
        </li>
        <li>
          <div>点赞数</div>
          <div>0</div>
        </li>
        <li>
          <div>评论数</div>
          <div>1</div>
        </li>
        <li>
          <div>收藏数</div>
          <div>1</div>
        </li>
        <li>
          <div>分享数</div>
          <div>1</div>
        </li>
        <li class="all">
          <div>累计播放量</div>
          <div>25907</div>
        </li>
      </ul>
    </div>
    <div class="mostspeed">
      <span class="title">昨七日飙升最快</span>
        <el-table :data="tableData" border style="width: 95%">
          <el-table-column prop="play" label="播放数" class="active"></el-table-column>
          <el-table-column prop="good" label="点赞数" ></el-table-column>
          <el-table-column prop="remark" label="评论数" ></el-table-column>
          <el-table-column prop="like" label="收藏数" ></el-table-column>
          <el-table-column prop="share" label="分享数"></el-table-column>
          <el-table-column  ></el-table-column>
          <el-table-column prop="sevendays" label="近7天" ></el-table-column>
          <el-table-column prop="thirtydays" label="近30天" ></el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
