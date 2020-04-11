<template>
  <div class="hot-singer">
     <el-row class="common-C">
      <div>
          <i class="el-icon-headset color"></i>
          <span class="titleName">热门歌手</span>
          <router-link class="more" tag='span'  :to="{name:'singer'}" style="cursor:pointer;">更多</router-link>
          <i class="el-icon-zoom-in imore"></i>
      </div>
     </el-row>
     <el-row>
       <div>
       <router-link tag="div" :to="{ name: 'singerDetail', params:{singerid:item.singerId}}" v-for="(item,i) in hotSinger" :key="i" style="display:inline-block;height:200px;width:220px;cursor: pointer;">
          <el-card :body-style="{ padding: '5px'}" shadow="never">
            <img :src="item.photo" alt="热门歌手的介绍图片"><!--等后端给了图片的链接的时候改变-->
            <div style="padding-left:78px;">
              <span>{{item.artistName}}</span>
            </div>
          </el-card>
        </router-link>
       </div>
     </el-row>
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
      console.log(res.code)
      if (res.code === 1) {
        var k = 0
        let arr = []
        for (var i = 0; i < 6; i++) {
          arr[i] = res.data[k++]
          if (k === res.data.length) {
            break
          }
        }
        this.hotSinger = arr
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
