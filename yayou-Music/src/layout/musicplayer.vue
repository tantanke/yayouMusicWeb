<template>
  <div class="musicplayer">
    <el-row>
      <el-col :span="16">
        <p class="music-title" >{{ismusicvip}}</p>
        <aplayer @onListSwitch='listChange'  :audio="tesobj" :lrcType="1" :autoplay="true" ref="aplayer"/>
        <div class="lastbtn"><i class="el-icon-d-arrow-left" @click="lastsong"></i></div>
        <div class="nextbtn"><i class="el-icon-d-arrow-right" @click="nextsong"></i></div>
        <div class="musicplayerzan"  v-if="haszan">
        <span>点赞该音乐:</span>
        <i v-if="isHasZan" @click="cancelZan" class='iconfont icon-xinaixin1'></i>
        </div>
        <div v-else class="musicplayerzan">
          <span>取消点赞:</span>
          <i  @click="confirmZan" class='iconfont icon-xinaixin'></i>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-table
        :data="tableData"
        :row-style="style"
        type="index"
        height="200"
        style="width: 100%">
        <el-table-column prop="name" label="歌曲名" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.singer}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时长" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)">
              移除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import APlayer from '@moefe/vue-aplayer'
import qs from 'qs'
Vue.use(APlayer, {})
export default {
  components: {
    APlayer
  },
  data () {
    return {
      isHasZan: true,
      ismusicvip: '播放音乐中......(若无歌词请刷新页面)',
      songId: 1,
      tesobj: [
      ],
      songobj: {},
      style: {
        height: 30
      },
      tableData: [{
        singer: '123',
        name: '王小虎',
        time: '3m4s'
      }],
      musicobj: [
        {
          name: '东西（Cover：林俊呈）',
          artist: '纳豆',
          url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc'
        }
      ]
    }
  },
  computed: {
    haszan () {
      return this.isHasZan
    }
  },
  methods: {
    judgeZan () {
      let _this = this
      _this.$axios({
        method: 'get',
        url: '/user/songIfLike',
        params: {songId: _this.songId}
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.data.message === '已点赞') {
            _this.isHasZan = false
          } else {
            _this.isHasZan = true
          }
        }
      })
    },
    cancelZan () {
      let _this = this
      _this.$axios({
        method: 'post',
        url: '/user/likeSong',
        data: qs.stringify({songId: _this.songId})
      }).then(res => {
        if (res.data.code === 1) {
          _this.isHasZan = false
        } else if (res.data.code === 20001) {
          alert('请先登录')
        } else {
          _this.$message.error(res.data.msg)
        }
      })
    },
    confirmZan () {
      let _this = this
      _this.$axios({
        method: 'post',
        params: {
          _method: 'delete'
        },
        url: '/user/cancelLike',
        data: qs.stringify({songId: _this.songId})
      }).then(res => {
        if (res.data.code === 1) {
          _this.isHasZan = true
        } else {
          _this.$message.error('取消点赞失败')
        }
      })
    },
    listChange (e) {
      console.log(1)
    },
    nextsong () {
      this.$refs.aplayer.skipForward()
    },
    lastsong () {
      this.$refs.aplayer.skipBack()
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  mounted () {
    let _this = this
    // 获取id:this.$route.params.id 进行下一步操作
    _this.songId = _this.$route.params.songId
    let songId = _this.$route.params.songId
    let isvip = _this.$route.params.isvip
    console.log(songId, isvip)
    this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
    _this.$axios.create({
      withCredentials: true
    })
    if (localStorage.getItem('Authorization')) {
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
      if (isvip === 1) {
        this.$axios({
          method: 'get',
          url: '/vip/playMusic',
          params: {'songId': songId}
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 1) {
              _this.songobj.url = res.data.data.audio
              _this.songobj.name = res.data.data.songName
              _this.songobj.cover = res.data.data.cover
              _this.songobj.lrc = res.data.data.lyrText
              _this.songobj.artist = res.data.data.artist
              _this.tesobj.push(_this.songobj)
              console.log(_this.tesobj)
            } else {
              _this.$message.error('系统繁忙，请刷新后重试')
            }
          })
          .catch(() => {
            _this.$message.error('系统繁忙，请刷新后重试')
          })
      } else {
        this.$axios({
          method: 'get',
          url: '/user/playMusic',
          params: {'songId': songId}
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 1) {
              _this.songobj.url = res.data.data.audio
              _this.songobj.name = res.data.data.songName
              _this.songobj.cover = res.data.data.cover
              _this.songobj.lrc = res.data.data.lyrText
              _this.songobj.artist = res.data.data.artist
              _this.tesobj.push(_this.songobj)
              console.log(_this.tesobj)
            } else {
              _this.$message.error('系统繁忙，请刷新后重试')
            }
          })
          .catch(() => {
            _this.$message.error('系统繁忙，请刷新后重试')
          })
      }
    } else {
      if (isvip === 1) {
        alert('请登录')
      } else {
        this.$axios({
          method: 'get',
          url: '/visitorPlaySong',
          params: {'songId': songId}
        })
          .then(function (res) {
            console.log(res)
            if (res.data.code === 1) {
              _this.songobj.url = res.data.data.audio
              _this.songobj.name = res.data.data.songName
              _this.songobj.cover = res.data.data.cover
              _this.songobj.lrc = res.data.data.lyrText
              _this.songobj.artist = res.data.data.artist
              _this.tesobj.push(_this.songobj)
              console.log(_this.tesobj)
            } else {
              _this.$message.error('系统繁忙，请刷新后重试')
            }
          })
          .catch(() => {
            _this.$message.error('系统繁忙，请刷新后重试')
          })
      }
    }
    _this.judgeZan() // 判断是否点赞
  }
}
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_1609227_qw7fa8ylq3.css');//爱心icon
.musicplayer{
  width: 1200px;
  .el-table .success-row {
    background: #f0f9eb;
  }
}
.musicplayerzan{
  i{
    font-size: 28px;
    margin-left: 10px;
    cursor: pointer;
  }
  .icon-xinaixin{
    color: #FF4752;
  }
}
.music-title{
  font-size: 20px;
  margin-bottom: 10px;
}
.aplayer{
  background-color: #FFFAFA;
  width: 800px;
  .aplayer-body{
    .aplayer-pic{
      .aplayer-pause{
        position: relative;
        top: 90px;
        left: 90px;
      }
      height: 200px !important;
      width: 200px !important;
    }
    .aplayer-info{
      height: 220px !important;
      .aplayer-music{
        margin-bottom: 10px
        span{
          position: relative;
          left: 770px;
        }
        .aplayer-title{
          font-size: 20px !important
        }
        .aplayer-author{
          font-size: 12px !important
        }
      }
      .aplayer-controller{
        .aplayer-bar{
        }

      }
      .aplayer-lrc{
        .aplayer-lrc-current{
          color: #FF4752
        }
        height: 130px;
        .aplayer-lrc-contents{
          p{
            font-size: 16px !important;
            height: 20px !important;
            line-height:20px !important;
            letter-spacing:6px
          }
        }
      }
    }
  }
}
.lastbtn{
  position: relative;
  top: -0px;
  left: 46px;
  font-size: 20px;
  z-index: 999;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  color:white;

}
.nextbtn
{
  border-radius: 50%;
  border: 2px solid white;
  color:white;
  position: absolute;
  top: 90px;
  font-size: 20px;
  left: 140px;
  z-index: 999;
  cursor: pointer;
}
</style>
