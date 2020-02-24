<template>
  <div class="create-main">
    <div class="leftpart">
      <div>
        <el-button type="danger" round>发布作品</el-button>
      </div>
      <div class="allfactor">
        <div>
          <img src="../.././assets/img/homePage/c1.png" alt="">
            <span class="title">综合</span>
        </div>
        <ul>
          <router-link tag='li' :to="{name:'createpage'}"  ><span>首页</span></router-link>
          <li><span>任务中心</span></li>
          <router-link tag='li' :to="{name:'createsongnum'}"  ><span>作品数量</span></router-link>
          <li><span>粉丝中心</span></li>
          <li><span>我的钱包</span></li>
          <li><span>评论管理</span></li>
        </ul>
      </div>
      <div class="music">
        <div>
           <img src="../.././assets/img/homePage/c2.png" alt="">
            <span class="title">音乐</span>
        </div>
        <ul>
          <li><span>音乐管理</span><i class="el-icon-caret-bottom"></i></li>
          <li><span>授权中心</span></li>
        </ul>
      </div>
    </div>
    <div class="rightpart">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "@/assets/css/createcentre/main.scss";
</style>
