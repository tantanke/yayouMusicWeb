<template>
  <div class="hot-song">
    <pic-content/>
    <el-row>
      <el-col :span='18' class="song-sheet">
        <el-row class="fContent">
         <div>
           <i class="el-icon-headset color"></i>
          <span class="hotPic">热门歌单</span>
          <span class="more">更多</span>
           <i class="el-icon-zoom-in imore"></i>
        </div>
        </el-row>
        <el-row class="sContent">
          <el-col class="card-box" :span="6" v-for="(o, index) in 8" :key="o" :offset="index > 0 ? 2 : 0">
           <el-card class="hot-card" shadow="never">
             <div class="imgBox">
                <img src="../../assets/img/homePage/图层28.png" class="image">
             </div>
            <div class="word-box">
              <p class="word">我为你歌唱，美妙而来</p>
              <p class="bofang">播放量：115.3w</p>
              <div class="bottom clearfix">
             </div>
            </div>
    </el-card>
  </el-col>
        </el-row>
      </el-col>
      <el-col :span='6' class="jz-hot">
        <el-row>
          <i class="el-icon-headset color"></i>
          <span >家族人气值</span>
          <el-divider class="jz-line1"></el-divider>
        </el-row>
        <el-row class="rankList">
          <el-col :span="6">
            <ul class='rankPic'>
              <li>
                <img src="../../assets/img/homePage/1.png" alt="">
              </li>
              <li>
                <img src="../../assets/img/homePage/2.png" alt="">
              </li>
              <li>
                <img src="../../assets/img/homePage/3.png" alt="">
              </li>
              <li>
                4
              </li>
              <li>
                5
              </li>
            </ul>
          </el-col>
          <el-col :span='18'>
            <ul class="ranking">
               <li>
                 <p>
                   <span>帕查惹什</span>
                   <span>15万</span>
                 </p>
                 <div class="y-content"><span>帕查惹什</span></div>
               </li>
               <li>
                 <p>
                   <span>帕查惹什</span>
                   <span>15万</span>
                 </p>
                 <div class="y-content"><span>帕查惹什</span></div>
               </li>
               <li>
                 <p>
                   <span>帕查惹什</span>
                   <span>15万</span>
                 </p>
                 <div class="y-content"><span>帕查惹什</span></div>
               </li>
               <li>
                 <p>
                   <span>帕查惹什</span>
                   <span>15万</span>
                 </p>
                 <div class="y-content"><span>帕查惹什</span></div>
               </li>
               <li>
                 <p>
                   <span>帕查惹什</span>
                   <span>15万</span>
                 </p>
                 <div class="y-content"><span>帕查惹什</span></div>
               </li>
            </ul>
          </el-col>
        </el-row>
        <el-divider class="jz-line2"></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import picContent from './picContent.vue'
export default {
  components: {
    picContent
  },
  data () {
    return {
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
  }
}
</script>

<style>

</style>
