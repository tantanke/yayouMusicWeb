<template>
  <div class="allmovie" v-loading="loading">
    <div class="allmoviepage" ref="allmovie" >
    <el-row class="moviepic" >
      <div  class="moviecard" v-for='(item,index) in allMovieTable' :key="index"  @click="getData($event,item.videoId,item.isvip)">
        <img  :src="item.cover" alt="" />
        <p>{{item.videoName}})</p>
        <p>
          <span>{{item.artist}}</span>
        </p>
        <p>
          <i class="el-icon-video-camera">
            <span>102万</span>
          </i>
        </p>
      </div>
    </el-row><!--这里的分页采用后端分页 数据较多 -->
    <el-row>
      <el-pagination
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="totalLen"
    :page-size='30'>
    </el-pagination>
    </el-row>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      totalTable: 15,
      tableData: [],
      role: localStorage.getItem('Role')
    }
  },
  methods: {
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.tableData = []
      _this.loading = true
      _this.$axios({
        method: 'get',
        url: '/allMv',
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res)
          _this.totalTable = res.data.data.total
          res.data.data.list.forEach((item, index) => {
            let movieItem = {}
            // 差个专辑名
            movieItem.videoName = item.videoName
            movieItem.videoId = item.videoId
            movieItem.artist = item.artist
            movieItem.cover = item.cover
            movieItem.isvip = item.isvip
            _this.tableData.push(movieItem)
          })
        } else {
          this.$message.error('当前网络繁忙，请稍后再试！')
        }
        _this.loading = false
      })
    },
    getData (e, videoId, isvip) {
      console.log(videoId)
      this.$router.push({name: 'movieListItem', params: {isvip: isvip, movieid: videoId}})
    }
  },
  computed: {
    totalLen () {
      return this.totalTable
    },
    allMovieTable () {
      return this.tableData
    }
  },
  mounted () {
    this.click = true
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000' // 'http://175.24.83.13:8000'
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
    _this.loading = true
    _this.$axios({
      method: 'get',
      url: '/allMv',
      params: {pageNum: 1}
    }).then(res => {
      if (res.data.code === 1) {
        console.log(res)
        _this.totalTable = res.data.data.total
        res.data.data.list.forEach((item, index) => {
          let movieItem = {}
          // 差个专辑名
          movieItem.videoName = item.videoName
          movieItem.videoId = item.videoId
          movieItem.artist = item.artist
          movieItem.cover = item.cover
          movieItem.isvip = item.isvip
          _this.tableData.push(movieItem)
        })
      } else {
        this.$message.error('当前网络繁忙，请稍后再试！')
      }
      _this.loading = false
    })
  }
}
</script>

<style lang="scss">
</style>
