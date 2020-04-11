<template>
  <div class="jc-recommend">
    <el-row class="common-C">
        <div>
           <i class="el-icon-headset color"></i>
            <span class="titleName">精彩推荐</span>
            <router-link class="more" tag='span'  :to="{name:'allsong'}" style="cursor:pointer;">更多</router-link><!--这个跳转到所有歌曲页面，还没有做-->
           <i class="el-icon-zoom-in imore"></i>
        </div>
    </el-row>
    <el-row class="box">
      <router-link :to="{ name: 'musicplayer', params:{songId: item.songId, isvip:item.isVip}}" v-for="item in recommend" :key="item.songId" >
        <img :src="item.cover" id="img1" alt="">
      </router-link>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      recommend: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://175.24.83.13:8000/highlight')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.recommend = res.data
        console.log(this.recommend)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
  #img1{
    width: 600px;
    height: 270px;
    padding-right: 20px;
  }
  .jc-recommend{
    width: 1300px;
    height: 320px;
    overflow: hidden;
  }
</style>
