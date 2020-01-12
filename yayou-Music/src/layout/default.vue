<template>
  <div>
    <el-container class="yayou-page">
      <el-header height="100%">
        <my-header/>
      </el-header>
      <el-main class="main-yayou-page">
        <router-view></router-view>
      </el-main>
      <el-footer height="100%">
        <my-footer/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import myHeader from '@/components/header/index.vue'
import myFooter from '@/components/footer/index.vue'
export default {
  components: {
    myHeader,
    myFooter
  }
}
</script>
<style lang="scss">
    @import '@/assets/css/public/layout.scss';
</style>
