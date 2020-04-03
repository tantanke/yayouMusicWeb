<template>
  <div>
      <el-container>
        <el-header height="100%">
        <c-header/>
      </el-header>
      <el-main class="createcentre-page">
          <c-main/>
      </el-main>
      <el-footer height="100%">
      </el-footer>
      </el-container>
  </div>
</template>

<script>
import CHeader from '@/components/createcentre/header.vue'
import CMain from '@/components/createcentre/main.vue'
export default {
  components: {
    CHeader,
    CMain
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/createcentre.scss';
</style>
