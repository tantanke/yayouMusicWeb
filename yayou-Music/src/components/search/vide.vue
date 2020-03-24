<template>
  <div class="allvideo" >
    <div class="allvideopage">
      <el-row class="videopic" >
        <routerLink  tag="div" :to="{name:'movieListItem',params:{movieid:10086}} " class="videocard" v-for="(index) in 30" :key="index"  >
          <img    @click="linkTo()" src="../../assets/img/homePage/狂徒(dts版).png" alt />
          <p>狂徒(dts版)</p>
          <p>
            <span>贾巴阿叄</span>
          </p>
          <p>
            <i class="el-icon-video-camera">
              <span>102万</span>
            </i>
          </p>
        </routerLink>
      </el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="200"
          class="number">
        </el-pagination>
      </el-row>
    </div>
    <router-view ></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods: {
    getHomeInfo () {
      axios({
        url: 'http://175.24.83.13:8000/hotMv',
        method: 'get',
        params: {
          'type': 2
        }
      })
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      console.log(res)
    }
  },
  linkTo () {
    this.$refs.allmovie.style.display = 'none' // 实现跳转 我是真的想不到别的方法了QAQ
  },
  mounted () {
    this.getHomeInfo()
    console.log(this)
  }
}
</script>

<style lang="scss">
  .allvideo{
    margin-top: 50px;
  }
  .allvideopage{
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding-left: 10px;
  }
  .videocard{
    width: 245px;
    height: 210px;
    float: left;
  }
  .videocard img{
    width: 220px;
    height: 140px;
  }
  .number{
      margin-top: 50px;
      margin-left: 280px;
    }
</style>
