<template>
  <div class="jc-recommend">
    <el-row class="common-C">
        <div>
           <i class="el-icon-headset color"></i>
            <span class="titleName">精彩推荐</span>
            <router-link class="more" tag='span'  :to="{name:'songSheet'}">更多</router-link>
           <i class="el-icon-zoom-in imore"></i>
        </div>
    </el-row>
    <el-row class="box">
        <img :src="item.cover" id="img1" alt="" v-for="item in recommend" :key="item.songId">
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
      axios.get('/highlight')
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
    width: 580px;
    height: 270px;
    padding: 0px;
    border: 1px solid red;
  }
  #img1 ~ #img1{
    margin-left:56px;
  }
  .jc-recommend{
    width: 1300px;
    height: 320px;
    overflow: hidden;
  }
</style>
