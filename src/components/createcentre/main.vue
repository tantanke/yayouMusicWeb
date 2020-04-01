<template>
  <div class="create-main">
    <div class="leftpart">
      <router-link tag="div" :to="{name:'handinprodution'}">
        <el-button type="danger" round>发布作品</el-button>
      </router-link>
      <div class="allfactor">
        <div>
          <img src="../.././assets/img/homePage/c1.png" alt="">
            <span class="title">综合</span>
        </div>
        <ul>
          <router-link tag="li" :to="{name:'handinprodution'}"  ><span>首页</span></router-link>
          <router-link tag='li' :to="{name:'dutycentre'}"  ><span>任务中心</span></router-link>
          <router-link tag='li' :to="{name:'createsongnum'}"  ><span>作品数量</span></router-link>
          <router-link tag='li' :to="{name:'fanscentre'}"  ><span>粉丝中心</span></router-link>
          <router-link tag='li' :to="{name:'mymoney'}"  ><span>我的钱包</span></router-link>
          <router-link tag='li' :to="{name:'remark'}"  ><span>评论管理</span></router-link>
        </ul>
      </div>
      <div class="music">
        <div>
           <img src="../.././assets/img/homePage/c2.png" alt="">
            <span class="title">音乐</span>
        </div>
        <ul>
          <router-link tag='li' :to="{name:'managemusic'}"><span>音乐管理</span><i class="el-icon-caret-bottom"></i></router-link>
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

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main.scss";
</style>
