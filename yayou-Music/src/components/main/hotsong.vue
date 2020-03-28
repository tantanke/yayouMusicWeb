<template>
  <div class="hot-song">
    <pic-content/>
    <el-row>
      <el-col :span='18' class="song-sheet">
        <el-row class="fContent">
          <div>
            <i class="el-icon-headset color"></i>
            <span class="hotPic">热门歌单</span>
            <router-link class="more" tag='span'  :to="{name:'songSheet'}">更多</router-link>
            <i class="el-icon-zoom-in imore"></i>
          </div>
        </el-row>
        <el-row class="sContent" v-for="i in 2" :key="i">
          <!--这下面的数据都是循环获得的 -->
          <el-col class="card-box" :span="6" v-for="(item,i) in array" :key="i">
           <el-card class="hot-card" shadow="never">
             <div class="imgBox">
               <!--这个地方需要动态的从后端获取数据 -->
                <img src="../../assets/img/homePage/themoonandthewell.png" class="image">
             </div>
            <div class="word-box">
              <p class="word">{{item.songListName}}</p>
              <p class="bofang">播放量：{{item.songNum}}</p>
              <div class="bottom clearfix"></div>
            </div>
           </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span='6' class="jz-hot">
        <el-row>
          <i class="el-icon-headset color"></i>
          <router-link :to="{ name:'ranklistdetail' }" tag="span">家族人气值</router-link>
          <el-divider class="jz-line1"></el-divider>
        </el-row>
        <family-hot></family-hot>
        <el-divider class="jz-line2"></el-divider>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import picContent from './picContent.vue'
import familyHot from './familyhot.vue'
import axios from 'axios'
export default {
  components: {
    picContent,
    familyHot
  },
  data () {
    return {
      array: [],
      rankImg: [{
        rank: 1,
        src: '../../assets/img/homePage/1.png'
      }, {
        rank: 2,
        src: '../../assets/img/homePage/2.png'
      }, {
        rank: 3,
        src: '../../assets/img/homePage/3.png'
      }, {
        rank: 4,
        src: '../../assets/img/homePage/4.png'
      }, {
        rank: 5,
        src: '../../assets/img/homePage/4.png'
      }]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/hotSongList')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      this.array = res.data
      console.log(res)
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>

</style>
