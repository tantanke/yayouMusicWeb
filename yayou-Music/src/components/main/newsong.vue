<template>
  <div class="new-song">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">新歌首发</span>
        <router-link class="more" tag='span'  :to="{name:'allsong'}" style="cursor:pointer;">更多</router-link>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <router-link tag="div" :to="{ name: 'musicplayer', params:{songId: item.songId, isvip:item.isvip}}" v-for="(item,i) in newSong" :key="i" style="display:inline-block;height:200px;width:220px;cursor:pointer;">
          <el-card :body-style="{padding: '5px'}" shadow="never">
              <img :src="item.cover" class="song-img"/><!--这个地方后面也需要请求后端的图片链接的接口 名字是cover-->
              <div class="song-info">
                <div>
                  <p>{{item.songName}}</p>
                </div>
                <span>{{item.artist}}</span>
              </div>
            </el-card>
        </router-link>
      </div>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      newSong: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://175.24.83.13:8000/newSongs')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      console.log(res)
      res = res.data
      if (res.code === 1) {
        var k = 0
        let arr = []
        for (var i = 0; i < 6; i++) {
          arr[i] = res.data[k++]
          if (k === res.data.length) {
            break
          }
        }
        this.newSong = arr
        this.$forceUpdate()
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="scss" scoped>
  .song-img{
    width:200px;
    height:200px
  }
</style>
