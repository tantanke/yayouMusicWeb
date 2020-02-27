<template>
  <div class="new-song">
    <el-row class="common-C">
      <div>
        <i class="el-icon-headset color"></i>
        <span class="titleName">新歌首发</span>
        <span class="more">更多</span>
        <i class="el-icon-zoom-in imore"></i>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-col :span="4" v-for="o in 6" :key="o">
              <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img src="../../assets/img/homePage/吉克杰拉.png" />
                <div class="song-info">
                  <div>
                    <p>他们都去了远方</p>
                  </div>
                  <span>吉克吉拉</span>
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
export default {}
</script>

<style>
</style>
