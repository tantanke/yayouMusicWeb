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
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-col :span="4" v-for="(item,i) in newSong" :key="i">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img src="../../assets/img/homePage/吉克杰拉.png" /><!--这个地方后面也需要请求后端的图片链接的接口 名字是cover-->
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
      axios.get('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/newSongs')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.newSong = res.data
        console.log(res)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
</style>
