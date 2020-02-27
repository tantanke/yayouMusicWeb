<template>
  <div class="singer-recommend">
    <el-row class='singerCategory'>
       <ul>
         <li class="all active"><span>全部</span></li>
         <li class="man"><span>男</span></li>
         <li class="woman"><span>女</span></li>
         <li class="band"><span>组合</span></li>
       </ul>
    </el-row>
    <el-row class="firstName">
      <ul>
        <li class='hot active'>热门</li>
        <li v-for="(item,index) in nameList" :key="index"><span>{{ item }}</span></li>
      </ul>
    </el-row>
    <el-row class='singerCard' ><!-- 动态路由-->
      <routerLink v-for='(index) in 36' :key="index" tag='div' :to="{name:'likesinger',params:{singerid:10086}}">
      <img src="../../assets/img/homePage/说比阿达.png" alt="">
      <span>说比阿达</span>
      </routerLink>
    </el-row>
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="36" :pager-count="6" layout="prev, pager, next" :total="720"></el-pagination>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    }
  }
}
</script>

<style>

</style>
