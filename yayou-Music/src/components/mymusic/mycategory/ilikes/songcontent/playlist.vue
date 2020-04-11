<template>
  <div class="iLikeSong">
    <el-row class="songList">
      <p>歌曲列表</p>
      <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column prop="order" label="序号" width="100"></el-table-column>
        <el-table-column prop="song" label="歌曲" width="280">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="{name: 'musicplayer',params: {isvip:scope.row.isvip, songId: scope.row.songId}}" style="cursor:pointer">{{ scope.row.song }}</router-link>
            <span class="vip" v-if="scope.row.isvip === 1">vip</span>
            <!-- <span class='dujia'>独家</span>
            <span class="movie">MV</span> -->
        </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="150">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="180"></el-table-column>
        <!-- <el-table-column prop="isvip" label=" 是否vip专属（1是 0不是）" width='150' style="display:none"></el-table-column> -->
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
      tableData: [],
      songTableData: [
        {
          order: 1,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 0,
          songId: 1
        }
      ]
    }
  },
  computed: {
    totalLen () {
      return this.totalTable
    },
    likeSongTable () {
      return this.tableData
    }
  },
  mounted () {
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000' // http://yayoutest.utools.club
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
      url: '/user/getLikeSong',
      params: {pageNum: 1}
    }).then(res => {
      if (res.data.code === 1) {
        console.log(res)
        _this.totalTable = res.data.data.total
        let order = 1
        res.data.data.list.forEach((item, index) => {
          let albumitem = {}
          // 差个专辑名
          albumitem.order = order++
          albumitem.isvip = item.isvip
          albumitem.ed = item.albumName
          albumitem.song = item.songName
          albumitem.singer = item.artist
          albumitem.songId = item.songId
          _this.tableData.push(albumitem)
        })
      } else {
        this.$message.error('当前网络繁忙，请稍后再试！')
      }
    })
  },
  methods: {
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.tableData = []
      _this.$axios({
        method: 'get',
        url: '/user/getCollectSongs',
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res)
          _this.totalTable = res.data.data.total
          let order = 1
          res.data.data.list.forEach((item, index) => {
            let albumitem = {}
            // 差个专辑名
            albumitem.order = order++
            albumitem.isvip = item.isvip
            albumitem.ed = item.albumName
            albumitem.song = item.songName
            albumitem.singer = item.artist
            albumitem.songId = item.songId
            _this.tableData.push(albumitem)
          })
        } else {
          this.$message.error('当前网络繁忙，请稍后再试！')
        }
      })
    }
  }
}
</script>

<style>
</style>
