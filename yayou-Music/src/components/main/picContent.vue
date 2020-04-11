<template>
  <div class="yy-slider">
    <div class="slider" >
    <el-carousel >
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <img :src="item.img" alt="" >
      </el-carousel-item>
    </el-carousel>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [{
        url: '#xxx',
        img: require('../../assets/img/homePage/sliderPicB.png')
      }, {
        url: '#bbx',
        img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1573505367,3810182287&fm=26&gp=0.jpg'
      }, {
        url: '#aax',
        img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1584381678,2641813906&fm=26&gp=0.jpg'
      }]
    }
  }
}
</script>
