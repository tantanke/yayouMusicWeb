<template>
  <div class="aboutsinger">
    <div class="like-singer">
      <el-row class="singer-info"><!-- 这里为动态路由跳转获歌手信息-->
        <el-col :span="5">
          <img src="../../assets/img/homePage/说比阿达.png" alt />
        </el-col>
        <el-col :span="19">
          <dl>
            <dt>{{singerin.singerName}}</dt>
            <dd class="singerinfo">
              <!--这里所有信息可用{{}}填入 -->
              <div>
                别名:汉名
                <span>莫春林</span>
                国籍:
                <span>中国</span>
                出生地:
                <span>四川凉山州</span>
                职业:
                <span>彝族音乐人，歌手</span>
                代表作品:
                <span>彝族歌曲《不要怕》,《就要怕》</span>
              </div>
              <span class="more">[更多]</span>
              <span class="complain">[举报]</span>
            </dd>
            <dd class="songinfo">
              <span>单曲&ensp;855</span>
              <el-divider direction="vertical"></el-divider>
              <span>专辑&ensp;34</span>
              <el-divider direction="vertical"></el-divider>
              <span>MV&ensp;1385</span>
            </dd>
            <dd class="singerbutton">
              <div class="singervideoplay active">
                <i class="el-icon-upload2"></i>
                <span>播放歌手热门歌曲</span>
              </div>
              <div class="focus" @click="focus">
                <i class="el-icon-plus"></i>
                <span v-if="!ifFocus">关注 {{singerin.fanNum}}</span>
                <span v-else>已关注 {{singerin.fanNum}}</span>
              </div>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </div>
    <el-row class="singersonglist">
      <el-row class="title">
        <ul>
          <li>单曲</li>
          <li>MV</li>
          <li>简介</li>
        </ul>
      </el-row>
      <el-row class="list">
         <el-table :data="allSongTable" style="width: 100%" stripe>
        <el-table-column prop="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="songName" label="歌曲(点击歌曲名播放)" width="650">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="{name: 'musicplayer',params: {isvip:scope.row.isvip, songId: scope.row.songId}}" style="cursor:pointer">{{ scope.row.songName }}</router-link>
            <span class="vip">vip</span>
            <span class='dujia'>独家</span>
            <span class="movie">MV</span>
        </template>
        </el-table-column>
        <el-table-column prop="artist" label="歌手" width="250">
        </el-table-column>
        <el-table-column prop="albumName" label="专辑" width="200"></el-table-column>
      </el-table>
      </el-row>
    </el-row>
    <!-- <el-row>
       <router-view></router-view>
    </el-row> 后面需要的话就写上 -->
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="15" @current-change="handleCurrentChange" :total="totalLen"
      layout="prev, pager, next" ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      singerinfo: {},
      totalTable: 15,
      tableData: [],
      ifFocus: false,
      urls: {
        focus: 'http://175.24.83.13:8000/user/subscribeSinger',
        cancelFocus: 'http://175.24.83.13:8000/user/unsubscribeSinger',
        isNotFocus: 'http://175.24.83.13:8000/user/ifSub'
      },
      songTableData: [
        {
          order: 1,
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
    isNotFocus () {
      let singerId = this.$route.params.singerid
      this.$axios({
        url: this.urls.isNotFocus,
        method: 'get',
        params: {singerId: singerId}
      })
        .then(res => {
          if (res.data.code === 1) {
            if (res.data.data === '已关注') {
              this.ifFocus = true
            } else {
              this.ifFocus = false
            }
            this.$forceUpdate()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    focus () {
      let singerId = this.$route.params.singerid
      if (!this.ifFocus) {
        this.$axios({
          url: this.urls.focus,
          method: 'post',
          params: {singerId: singerId}
        })
          .then(res => {
            console.log(res)
            if (res.data.code === 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.ifFocus = true
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$axios({
          url: this.urls.cancelFocus,
          method: 'post',
          params: {
            _method: 'delete',
            singerId: singerId
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.code === 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.ifFocus = false
            } else {
              if (res.data.msg) {
                this.$message.error(res.data.msg)
              } else {
                this.$message.error('请稍后尝试')
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      let singerId = this.$route.params.singerid
      _this.tableData = []
      _this.$axios({
        method: 'get',
        url: '/user/getCollectSongs',
        params: {pageNum: curPage, singerId: singerId}
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
            /*  albumitem.albumName = item.albumName */
            albumitem.songName = item.songName
            albumitem.artist = item.artist
            albumitem.songId = item.songId
            _this.tableData.push(albumitem)
          })
        }
      })
    }
  },
  computed: {
    totalLen () {
      return this.totalTable
    },
    allSongTable () {
      return this.tableData
    },
    singerin () {
      return this.singerinfo
    }
  },
  mounted () {
    let _this = this
    let singerId = this.$route.params.singerid
    console.log(singerId)
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000' // 'http://175.24.83.13:8000'
    console.log()
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
    // 获取歌手信息
    _this.isNotFocus()
    _this.$axios({
      method: 'get',
      url: '/getSingerInfo',
      params: {singerId: singerId}
    }).then(res => {
      _this.singerinfo.singerName = res.data.data.singerName
      _this.singerinfo.fanNum = res.data.data.fanNum
      // 其他的数据后面有需要再填充
    })
    // 获取第一页页码
    _this.$axios({
      method: 'get',
      url: '/getSingerAlbum',
      params: {pageNum: 1, singerId: singerId}
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
          albumitem.albumName = item.albumName
          albumitem.songName = '等雨来' // item.songName
          albumitem.artist = item.artist
          albumitem.songId = item.songId
          _this.tableData.push(albumitem)
        })
      }
    })
  }
}

</script>

<style>
</style>
