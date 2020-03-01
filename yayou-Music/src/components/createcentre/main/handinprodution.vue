<template>
  <div class="compose-class">
    <div class="compose-class-header"><div>创作类型</div></div>
    <div class="compose-class-main">
      <div>
        <div class="compose-common-produce common-style-one">
          <div class="iconfont">&#xe61e;</div>
        <h5>创作普通专辑</h5>
        <p>粉丝可免费收听你的专辑</p>
        <p>创建要求音乐人指数达到450</p>
      </div>
      <div class="compose-number-produce common-style-one">
           <div class="iconfont">&#xe61e;</div>
        <h5>创作数字专辑</h5>
        <p>粉丝需要付费收听你的专辑</p>
      </div>
      </div>
      <div>
        <div class="hand-in-finishedbox common-style-two">
        <span class="iconfont">&#xe61e;上传作品至已发布专辑</span>
      </div>
      <div class="hand-in-graftbox common-style-two">
        <span class="iconfont">&#xe61e;上传至草稿箱</span>
      </div>
      </div>
    </div>
    <div class="compose-class-footer">发布原创demo到我的音乐电台</div>
  </div>
</template>

<script>
export default {
  name: 'ComposeClassContent'
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/handinprodution.scss";
</style>
