<template>
  <div class="hot-movie">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">热门电影</span>
        <span class="more">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-col :span="8" v-for="(item,i) in hotMovie" :key="i">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <div class="imgBox">
                  <img src="../../assets/img/homePage/themoonandthewell.png" />
                </div>
                <div class="line">
                  <p>{{item.videoName}}</p>
                  <p>
                    <span>{{item.artist}}</span>
                  </p>
                  <p>
                    <i class="el-icon-video-camera">
                      <span class="number">{{item.watch}}</span>
                    </i>
                  </p>
                  <div class="bottom clearfix"></div>
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
      hotMovie: [],
      imgList: [
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        },
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        },
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        }
      ]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/hotMv')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.hotMovie = res.data
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
