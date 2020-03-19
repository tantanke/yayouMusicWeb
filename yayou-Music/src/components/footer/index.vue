<template>
  <div class="yy-footer">
    <el-row class="footer-content">
      <el-col :span="16" class="left-content">
        <el-row>
          <el-col :span="13">
            <span class="title1">关于涯悠数据</span>
            <ul>
              <li>
                <span>热门推荐</span>
              </li>
              <li>
                <span>家族排行榜</span>
              </li>
              <li>
                <span>精彩推荐</span>
              </li>
              <li>
                <span>新歌首发</span>
              </li>
              <li>
                <span>排行榜</span>
              </li>
              <li>
                <span>热门歌手</span>
              </li>
              <li>
                <span>电影</span>
              </li>
            </ul>
          </el-col>
          <el-col :span="11">
            <span class="title2">联系我们</span>
            <ul class="callUs">
              <li>
                <span>联系电话:0834-3437086</span>
              </li>
              <li>
                <span>家族排行榜</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-divider class="line"></el-divider>
        <el-row>
          <div class="bUl">
            <div class="c1">
            <span>服务条款</span>
            <el-divider direction="vertical"></el-divider>
            <span>隐私政策</span>
            <el-divider direction="vertical"></el-divider>
            <span>儿童隐私政策</span>
            <el-divider direction="vertical"></el-divider>
            <span>版权投诉指引</span>
            <el-divider direction="vertical"></el-divider>
            <span>意见反馈</span>
            </div>
            <div class="c2">
              <span>涯悠公司版权所有@2019成都涯悠科技有限公司</span>
              <span>蜀ICP备19037366号-1</span>
              <span>运营：涯悠数据[2019]3806-263号</span>
            </div>
            <div class="c3">
              <span>违法和不良信息举报电话：0571-89853516</span>
              <span>举报邮箱：ncm5990@163.com</span>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="8" class="right-content">
        <p class="downLoad">涯悠app下载</p>
        <div class="appD">
           <img src="../../assets/img/homePage/图层15拷贝.png" alt="">
        </div>
        <div class="other">
          <div>
            <img src="../../assets/img/homePage/微博.png" alt="">
            <span>关注微博</span>
          </div>
          <div>
             <img src="../../assets/img/homePage/微信.png" alt="">
             <span>关注微信</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "@/assets/css/public/footer/index.scss";
</style>
