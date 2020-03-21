<template>
  <div class="hot-singer">
      <el-row class="common-C">
        <div>
           <i class="el-icon-headset color"></i>
            <span class="titleName">热门歌手</span>
            <span class="more">更多</span>
           <i class="el-icon-zoom-in imore"></i>
        </div>
     </el-row>
     <ul class="singer-list" v-for="(item, i) in hotSinger" :key="i">
       <li>
         <img src="../../assets/img/homePage/山鹰组合.png" alt=""><!--等后端给了图片的链接的时候改变-->
         <span>{{item.singerName}}</span>
       </li>
     </ul>
     <el-row>
     </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      hotSinger: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/hotSinger')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.hotSinger = res.data
        console.log(this.hotSinger)
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
