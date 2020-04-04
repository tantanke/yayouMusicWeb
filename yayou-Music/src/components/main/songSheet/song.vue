<template>
<!--这个是所有歌曲的页面调用的接口是获取歌单中的歌曲信息(除了播放链接)-->
  <div>
    <el-row class="songlist">
      <el-row class="title">
          <h4>单曲</h4>
      </el-row>
      <el-row class="list">
        <el-table :data="songTableData" style="width: 100%" stripe>
          <el-table-column prop="songId" label="序号" width="70"></el-table-column>
          <el-table-column prop="songName" label="歌曲(点击歌曲名播放)" width="650">
            <template slot-scope="scope">
              <router-link tag="a" target="_blank" :to="{name: 'musicplayer',params: {isvip:scope.row.isvip, songId: scope.row.songId}}" style="cursor:pointer">{{ scope.row.songName }}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="artist" label="歌手" width="250">
          </el-table-column>
          <el-table-column prop="albumName" label="专辑" width="200"></el-table-column>
        </el-table>
      </el-row>
    </el-row>
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="15" @current-change="handleCurrentChange" :total="totalLen"
      layout="prev, pager, next" ></el-pagination>
    </el-row>
  </div>
</template>
<script>
</script>
export default {
  data () {
    return {
      songTableData: [
        {
          songName: '等雨停',
          artist: '南瑶乐队',
          albumName: '第一张单曲专辑',
          isvip: 0,
          songId: 1
        }
      ]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://175.24.83.13:8000/hotSongList')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
        this.$forceUpdate()
        console.log(this.array)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
<style>
</style>
