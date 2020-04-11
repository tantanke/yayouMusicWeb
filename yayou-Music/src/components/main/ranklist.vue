<template>
  <div class="song-rank-list">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName" style="cursor:default;">排行榜&emsp;</span>
        <span class="more" style="cursor:default;">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row class="pic">
      <div class="allSong" v-for="i in 5" :key="i"> <!--这个循环等接口写好了要好好看看-->
        <div>
          <img src="../../assets/img/homePage/彝族音乐榜.png" alt />
        </div>
        <ul>
          <li>
            <p>1&ensp;面朝大海</p>
            <span>南瑶乐队</span>
          </li>
          <li>
            <p>2&ensp;面朝大海</p>
            <span>南瑶乐队</span>
          </li>
          <li>
            <p>3&ensp;面朝大海</p>
            <span>南瑶乐队</span>
          </li>
          <li>
            彝族音乐榜
          </li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      allSong: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://175.24.83.13:8000musicRank')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.allSong = res.data.allSong
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
