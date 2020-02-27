<template>
  <div class="hot-movie">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">热门电影</span>
        <span class="more">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-col :span="8" v-for="(o,index) in imgList" :key="index">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <div class="imgBox">
                  <img src="../../assets/img/homePage/themoonandthewell.png" />
                </div>
                <div class="line">
                  <p>the moon and the well</p>
                  <p>
                    <span>山鹰组合</span>
                  </p>
                  <p>
                    <i class="el-icon-video-camera">
                      <span class="number">102万</span>
                    </i>
                  </p>
                  <div class="bottom clearfix"></div>
                </div>
              </el-card>
            </el-col>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        },
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        },
        {
          name: '111',
          src: '../../assets/img/homePage/themoonandthewell.png'
        }
      ]
    }
  }
}
</script>

<style>
</style>
