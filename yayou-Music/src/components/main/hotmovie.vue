<template>
  <div class="hot-movie">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">热门电影</span>
        <router-link class="more" tag='span'  :to="{name:'movie'}" style="cursor:pointer;">更多</router-link>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <el-carousel trigger="click" arrow="never">
          <el-carousel-item v-for="(Item,index) in hotMovie" :key="index" style="width:1260px;">
            <el-col :span="8" v-for="(item,i) in Item" :key="i+100">
              <router-link :to="{ name: 'movieListItem', params: {movieid: item.videoId, isvip:item.isvip}}" tag="div">
                <el-card :body-style="{ padding: '0px',margin: '0px' }" shadow="never">
                  <div class="imgBox" style="cursor:pointer;">
                    <img :src="item.cover" />
                  </div>
                  <div class="line" style="cursor:pointer;">
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
              </router-link>
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
          src: '/../assets/img/homePage/themoonandthewell.png'
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
      axios.get('http://175.24.83.13:8000/hotMv')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      console.log(res.code + '热门电影的数据')
      if (res.code === 1) {
        var k = 0
        console.log(res)
        for (var e = 0; e < Math.ceil(res.data.length / 3); e++) {
          let arr = []
          for (var i = 0; i < 3; i++) {
            arr[i] = res.data[k++]
            if (k === res.data.length) {
              break
            }
          }
          this.hotMovie[e] = arr
        }
        this.$forceUpdate()
        console.log(this.hotMovie)
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
