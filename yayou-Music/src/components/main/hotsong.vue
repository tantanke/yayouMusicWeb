<template>
  <div class="hot-song">
    <pic-content/>
    <el-row>
      <el-col :span='18' class="song-sheet">
        <el-row class="fContent">
          <div>
            <i class="el-icon-headset color"></i>
            <span class="hotPic">热门歌单</span>
            <router-link class="more" tag='span'  :to="{name:'songSheet'}" style="cursor:pointer;">更多</router-link><!--这个后面可以转成一个路由-->
            <i class="el-icon-zoom-in imore"></i>
          </div>
        </el-row>
        <el-row class="sContent" v-for="(Item,index) in array" :key="index">
          <!--这下面的数据都是循环获得的 -->
          <el-col class="card-box" :span="6" v-for="item in Item" :key="item.songListId">
           <el-card class="hot-card" shadow="never" style="cursor:pointer;">
             <div class="imgBox">
               <!--这个地方需要动态的从后端获取数据 -->
                <router-link :to="{ name: 'songlistdetail', params:{songlistid:item.songListId}}">
                  <img :src="item.cover" class="image">
                </router-link>
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
          <router-link :to="{ name:'ranklistdetail' }" tag="span" style="cursor:pointer;">家族人气值</router-link>
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
      axios.get('http://175.24.83.13:8000/hotSongList')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        var k = 0
        console.log(res)
        for (var e = 0; e <= (res.data.length / 4) && e < 2; e++) {
          let arr = []
          for (var i = 0; i < 4; i++) {
            arr[i] = res.data[k++]
            if (k === res.data.length) {
              break
            }
          }
          this.array[e] = arr
        }
        console.log(this.array)
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
