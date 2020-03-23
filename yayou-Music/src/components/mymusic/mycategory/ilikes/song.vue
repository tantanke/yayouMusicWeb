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
        <el-table-column prop="order" label="歌曲ID" width="100"></el-table-column>
        <el-table-column prop="song" label="歌曲" width="280">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="{name: 'musicplayer',params: {isvip:scope.row.isvip, songId: scope.row.order}}" style="cursor:pointer">{{ scope.row.song }}</router-link>
            <span class="vip" v-if="scope.row.isvip === 1">vip</span>
            <!-- <span class='dujia'>独家</span>
            <span class="movie">MV</span> -->
        </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="150">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="180"></el-table-column>
        <el-table-column prop="isvip" label=" 是否vip专属（1是 0不是）" width='150'></el-table-column>
      </el-table>
    </el-row>
    <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="totalLen"
    :page-size='15'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalTable: 15,
      songTableData: [
        {
          order: 1,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 0
        },
        {
          order: 2,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 3,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 0
        },
        {
          order: 4,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 5,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 6,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        }
      ]
    }
  },
  computed: {
    totalLen () {
      return this.totalTable
    }
  },
  mounted () {
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
    _this.$axios.create({
      withCredentials: true
    })
    _this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    _this.$axios({
      method: 'get',
      url: '/user/getCollectSongs',
      params: {pageNum: 1}
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.tableData = []
      _this.$axios({
        method: 'get',
        url: '/user/getLikeSong',
        // 这里的页码默认为一 singerId在路由中拿到
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res)
          _this.totalTable = res.data.data.total
          /*  res.data.data.list.forEach((item, index) => {
            let albumitem = {}
            albumitem.albumId = item.albumId
            albumitem.albumName = item.albumName
            albumitem.songNum = item.songNum
            albumitem.artist = item.artist
            albumitem.createtime = item.createtime
            _this.tableData.push(albumitem)
          }) */
        } else {
          _this.$message.error('当前网络繁忙，请刷新后重试！')
        }
      })
    }
  }
}
</script>

<style>
</style>
