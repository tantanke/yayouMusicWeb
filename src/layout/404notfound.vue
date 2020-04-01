<template>
  <div class="notfound">
      <i class='el-icon-circle-close'></i>
     <p>404</p>
     <p>这个页面暂时找不到了</p>
     <p>程序员去营救的路上了...</p>
     <router-link tag='el-button' :to="{name:'find'}">>点我立刻返回首页</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.notfound {
    position: absolute;
    top: 20%;
    left: 42%;
    p{
        font-size: 30px;
    }
    i{
        font-size: 100px;
        color: #EE0000;
    }
    button{
        margin-top: 10px;
    }
}
</style>>
