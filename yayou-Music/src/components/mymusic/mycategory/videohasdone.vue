<template>
  <div class="video">
     <el-row>
       <div class="havevideo" v-if="isHave">有视频</div>
       <div class="novideo" v-else>
         <div>
            <img src="../../../assets/img/homePage/novideo.png" alt="">
         </div>
       </div>
     </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isHave: false
    }
  }
}
</script>

<style>

</style>
