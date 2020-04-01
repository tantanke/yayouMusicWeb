<template>
   <div class='yy-header'>
     <el-row>
       <top-bar/>
     </el-row>
     <el-row>
          <el-divider class="line"></el-divider>
     </el-row>
     <!-- <el-row>
       <main-list/>
     </el-row> -->
   </div>
</template>

<script>
import topBar from './topbar.vue'
import mainList from './mainList.vue'
export default {
  components: {
    topBar,
    mainList
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/public/header/index.scss";
</style>
