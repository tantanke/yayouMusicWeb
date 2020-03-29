<template>
  <div class="new-song">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">新歌首发</span>
        <span class="more">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <el-carousel trigger="click" arrow="never">
          <el-carousel-item v-for="(Item,index) in newSong" :key="index" style="height:200px;width:1260px;">
            <el-col :span="4" v-for="item in Item" :key="item.songId" >
              <el-card :body-style="{ padding: '5px'}" shadow="never" >
                <img :src="item.cover" /><!--这个地方后面也需要请求后端的图片链接的接口 名字是cover-->
                <div class="song-info">
                  <div>
                    <p>{{item.songName}}</p>
                  </div>
                  <span>{{item.artist}}</span>
                </div>
              </el-card>
            </el-col>
          </el-carousel-item>
        </el-carousel>
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
      res = res.data
      if (res.code === 1) {
        var k = 0
        console.log(res)
        for (var e = 0; e <= (res.data.length / 6); e++) {
          let arr = {}
          for (var i = 0; i < 6; i++) {
            arr[i] = res.data[k++]
            if (k === res.data.length) {
              break
            }
          }
          this.newSong[e] = arr
        }
        this.$forceUpdate()
        console.log(this.newSong)
        console.log(res)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
