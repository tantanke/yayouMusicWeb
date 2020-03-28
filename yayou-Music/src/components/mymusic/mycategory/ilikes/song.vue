<template>
  <div class="iLikeSong">
    <el-row>
      <ul class="buttons">
        <li class="play active">
          <i class="el-icon-video-play"></i>
          <span>播放</span>
        </li>
        <li class="have">
          <i class="el-icon-folder-opened"></i>
          <span>收藏</span>
        </li>
        <li class="share">
          <i class="el-icon-position"></i>
          <span>分享</span>
        </li>
        <li class="download">
          <i class="el-icon-download"></i>
          <span>下载</span>
        </li>
        <li class="remark">
          <i class="el-icon-edit-outline"></i>
          <span>评论</span>
        </li>
      </ul>
    </el-row>
    <el-row class="songList">
      <p>歌曲列表</p>
      <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column prop="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="song" label="歌曲" width="320">
          <template slot-scope="scope">
            <router-link tag="span" :to="{name: 'musicplayer',params: {songId: scope.row.order}}" style="cursor:pointer">{{ scope.row.song }}</router-link>
            <span class="vip">vip</span>
            <span class='dujia'>独家</span>
            <span class="movie">MV</span>
        </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="150">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="180"></el-table-column>
        <el-table-column prop="time" label="时长" width='70'></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songTableData: [
        {
          order: 1,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 2,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 3,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 4,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 5,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 6,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 7,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 8,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 9,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 10,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 11,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        }
      ]
    }
  }
}
</script>

<style>
</style>
