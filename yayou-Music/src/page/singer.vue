<template>
<div class="page-singer">
    <div>
      <ul class="mainList">
          <li ><span>推荐</span></li>
          <li ><span>排行榜</span></li>
          <li ><span>歌单</span></li>
          <router-link tag='li'  :to="{name:'musiccate'}"><span>音乐分类</span></router-link>
          <router-link tag='li'  :to="{name:'singerList'}"><span>歌手</span></router-link>
      </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
    @import '@/assets/css/singercategory/index.scss';
</style>
