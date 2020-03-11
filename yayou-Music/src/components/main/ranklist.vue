<template>
  <div class="song-rank-list">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">排行榜&emsp;</span>
        <span class="more">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row class="pic">
      <div class="allSong" v-for="(item,i) in num" :key="i">
        <div>
          <img src="../../assets/img/homePage/彝族音乐榜.png" alt />
        </div>
        <ul v-for="(item,i) in allSong" :key="i">
          <li>
            <p>1&ensp;{{item.songName}}</p>
            <span>{{item.singerName}}</span>
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
      allSong: [],
      newSong: [],
      movie: [],
      search: [],
      rap: [],
      num: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=musicRank')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.allSong = res.data.allSong
        this.num = res.data.num
        console.log(this.num)
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
