<template>
   <el-row>
        <el-col :span="24">
            <div class="header">
                <img src="../../assets/img/homePage/vipselfheader.jpg">
                <img class="header-img" src="../../assets/img/homePage/头像.jpg">
            </div>
        </el-col>
        <p class="news">我的消息</p>
        <p class="news1">当前未开通</p>
   </el-row>
</template>

<script>
export default {

}
</script>
<style>
 .header{
   margin-top: -44px;
   margin-left:194px;
 }
 .header-img{
   position: relative;
   left: -1130px;
   top: -70px;
 }
 .news{
   position: relative;
   top: -272px;
   right: -520px;
   font-size: 24px;
   color: #fff;
 }
 .news1{
   position: relative;
   top: -258px;
   right: -520px;
   font-size: 16px;
   color: #fff;
   font-weight: 700;
 }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
