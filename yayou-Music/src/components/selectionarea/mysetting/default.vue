<template>
  <div class="default" >
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:0 0 50px 0px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >我的设置</el-breadcrumb-item>
    </el-breadcrumb>
    <ul>
      <router-link :to="{name: 'resetcheck', params:{msg: 'resetpassword'}}"><el-button>修改密码</el-button></router-link>
      <router-link :to="{name: 'resetcheck', params:{msg: 'resetphone'}}"><el-button>修改电话</el-button></router-link>
      <router-link :to="{name: 'resetheadimg'}"><el-button>修改头像</el-button></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.default{
  height: 330px;
}
</style>
