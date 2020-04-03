<template>
  <el-row class="create-header">
      <el-col :span='4' class="leftp">
        <el-row>
          <el-col :span='4' class="pic" ><img src="./../../assets/img/homePage/logo.png" alt=""></el-col>
          <el-col :span='9' :offset="1" class="title1">涯悠数据</el-col>
          <el-col :span='10' class="title2">创作者中心</el-col>
        </el-row>
      </el-col>
      <el-col :span='9' :offset="4" class="mainp">
        <ul>
          <router-link tag="li" class="firstpage" :to="{name:'find'}">首页</router-link>
          <router-link tag="li" class="personalC" :to="{name:'personalinfor'}">个人中心</router-link>
          <router-link tag="li" class="cquestion" :to="{name:'find'}">常见问题</router-link>
        </ul>
      </el-col>
      <el-col :span='6' :offset="1" class="rightp">
        <el-row>
          <el-col :span='4' class="message"><i class="el-icon-message"></i>
           <div class="number"><span>4</span></div>
          </el-col>
          <el-col :span='3' class="singerpic">
            <img src="../../assets/img/homePage/说比阿达.png" alt="">
            <ul>
            <router-link tag="li" :to="{name:'resetmusician'}"><i class="el-icon-s-custom"></i><span>个人信息修改</span></router-link>
          </ul>
          </el-col>
          <el-col :span='5' class="singername">阿比达</el-col>
          <el-col :span='8'  class="joinus">公司入驻<i class="el-icon-arrow-right"></i></el-col>
          <el-col :span='3' :offset="1">退出</el-col>
        </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss">
 @import "@/assets/css/createcentre/header.scss";
</style>
