<template>
  <div class="mysetting">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:510px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的设置</el-breadcrumb-item>
      <el-breadcrumb-item>头像设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row tag="div" class="top-area">
      <el-col :span="1" :offset="7" class="submit" @click="Submit"><span>上传头像</span></el-col>
      <el-col :span="5" :offset="1" tag="div" class="title">支持JPG、PNG、BMP格式的图片，且文件小于20M</el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="7">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else>
            <i class="el-icon-plus avatar-uploader-icon"></i><span class="ti">选择一张本地图片</span>
          </div>
        </el-upload>
        <el-row class="sec">
          <el-button type="primary" @click="onSubmit" class="save">保存</el-button>
          <el-button class="cancel">取消</el-button>
        </el-row>
      </el-col>
      <el-col :span="8" :offset="2" tag="div" class="img1-div">
        <img :src="imgUrl1" alt="">
        <span class="title">大尺寸头像(180x180像素)</span>
        <span class="m">头像预览</span>
      </el-col>
      <el-col :span="6" :offset="2" tag="div" class="img2-div">
        <img :src="imgUrl2" alt="">
        <span class="title">大尺寸头像(40x40像素)</span>
        <span class="n">头像预览</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "@/assets/css/selectionarea/mysetting.scss";
</style>
