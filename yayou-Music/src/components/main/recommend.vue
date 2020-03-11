<template>
  <div class="jc-recommend">
    <el-row class="common-C">
        <div>
           <i class="el-icon-headset color"></i>
            <span class="titleName">精彩推荐</span>
            <span class="more">更多</span>
           <i class="el-icon-zoom-in imore"></i>
        </div>
    </el-row>
    <el-row class="box">
        <img src="https://s2.ax1x.com/2020/02/28/3Dkp5T.jpg" class="img" alt="">
        <img src="https://s2.ax1x.com/2020/02/28/3Dkp5T.jpg" class="img" alt="">
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
      axios.get('http://yayoutest.utools.club/highlight')
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
  .img{
    width: 580px;
    height: 230px;
  }
  .jc-recommend{
    width: 1300px;
    height: 280px;
    overflow: hidden;
  }
</style>
