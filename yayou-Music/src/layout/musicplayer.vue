<template>
  <div>
      <aplayer :audio="musicobj" :lrcType="3" ref="aplayer"/>
      <div class="lastbtn"><i class="el-icon-d-arrow-left" @click="lastsong"></i></div>
      <div class="nextbtn"><i class="el-icon-d-arrow-right" @click="nextsong"></i></div>
  </div>
</template>

<script>
import Vue from 'vue'
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
})
export default {
  components: {
    APlayer
  },
  data () {
    return {
      tesobj: [],
      songobj: {},
      musicobj: [
        {
          name: '东西（Cover：林俊呈）',
          artist: '纳豆',
          url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
          cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc'
        },
        {
          name: '响喜乱舞（Cover：MARiA）',
          artist: '泠鸢yousa',
          url: 'https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3',
          cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        },
        {
          name: '啵唧',
          artist: 'Hanser',
          url: 'https://cdn.moefe.org/music/mp3/kiss.mp3',
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc'
        }
      ]
    }
  },
  methods: {
    nextsong () {
      this.$refs.aplayer.skipForward()
    },
    lastsong () {
      this.$refs.aplayer.skipBack()
    }
  },
  mounted () {
    let _this = this
    // 获取id:this.$route.params.id 进行下一步操作
    let songId = _this.$route.songId
    let isVip = _this.$router.isVip
    if (isVip) {
      this.$axios({
        method: 'get',
        url: '/api/vip/playMusic',
        params: {'songId': songId}
      })
        .then(function (res) {
          if (res.data.code === 1) {
            _this.songobj.url = res.data.data.audio
            _this.songobj.name = res.data.data.songName
            _this.songobj.cover = res.data.data.cover
            _this.songobj.lrc = res.data.data.lyrText
            _this.songobj.artist = res.data.data.artist
            _this.tesobj.push(_this.songobj)
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
        url: '/api/playMusic',
        params: {'songId': songId}
      })
        .then(function (res) {
          if (res.data.code === 1) {
            _this.songobj.url = res.data.data.audio
            _this.songobj.name = res.data.data.songName
            _this.songobj.cover = res.data.data.cover
            _this.songobj.lrc = res.data.data.lyrText
            _this.songobj.artist = res.data.data.artist
            _this.tesobj.push(_this.songobj)
          } else {
            _this.$message.error('系统繁忙，请刷新后重试')
          }
        })
        .catch(() => {
          _this.$message.error('系统繁忙，请刷新后重试')
        })
    }
  }

}
</script>

<style lang="scss">
.aplayer{
  background-color: #FFFAFA;
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
      height: 200px !important;
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
  position: absolute;
  top: 90px;
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
