<template>
   <div class='yy-header'>
     <el-row>
       <top-bar/>
     </el-row>
     <el-row>
          <el-divider class="line"></el-divider>
      </el-row>
   </div>
</template>

<script>
import topBar from './topbar.vue'
export default {
  components: {
    topBar
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
