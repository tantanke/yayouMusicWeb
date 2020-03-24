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
     <ul class="singer-list" v-for="(item, i) in hotSinger[0]" :key="i">
       <li>
         <img src="../../assets/img/homePage/山鹰组合.png" alt=""><!--等后端给了图片的链接的时候改变-->
         <span>{{item.artistName}}</span>
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
      axios.get('http://175.24.83.13:8000/hotSinger')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.hotSinger = res.data
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
          this.hotSinger[e] = arr
        }
        this.$forceUpdate()
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
