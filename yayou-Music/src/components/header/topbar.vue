<template>
  <div class="yy-topbar">
    <el-row>
      <el-col :span="1" class="yy-logo"></el-col>
      <el-col :span="3" class="yy-title"><router-link tag='span' :to="{path:'/index'}">涯悠数据</router-link></el-col>
      <el-col :span="11" class="yy-toplist">
        <ul class="nav" >
          <router-link tag='li'  :to="{name:'index'}"><div>我的发现</div></router-link>
          <router-link tag='li'  :to="{name:'myMusic'}"><div>我的音乐</div></router-link>
          <router-link tag='li'  :to="{name:'movie'}"><div>视频</div></router-link>
          <router-link tag='li'  :to="{name:'shop'}"><div>商城</div></router-link>
          <router-link tag='li'  :to="{name:'singer'}"><div>音乐人</div></router-link>
          <router-link tag='li'  :to="{name:'changeLanguage'}"><div>彝汉切换</div></router-link>
        </ul>
      </el-col>
      <el-col :span="6" class="yy-topsearch">
        <el-input v-model="topInfo.inputValue" placeholder="音乐、电影、商城、音乐人"></el-input>
        <i class="el-icon-search"></i>
        </el-col>
      <el-col :span="3" class="yy-login">
        <span v-if="isnotLogin" class='login'>登陆</span>
        <div class="loginPic" v-else>
          <img src="../../assets/img/homePage/sliderPic.png" alt="">
          <ul>
            <router-link tag='li' class="active" :to="{name:'myMusic'}"><i class="el-icon-user"></i><span>个人中心</span></router-link>
            <li><i class="el-icon-chat-dot-round"></i><span>我的消息</span></li>
            <router-link tag="li" :to="{name:'setting', params: {username: this.username}}"><i class="el-icon-s-custom"></i><span>我的设置</span></router-link>
            <li><i class="el-icon-service"></i><span>VIP会员</span></li>
            <li><i class="el-icon-s-order"></i><span>我的收藏</span></li>
            <li><i class="el-icon-lollipop"></i><span>我的歌单</span></li>
            <li><i class="el-icon-wind-power"></i><span>我的下载</span></li>
            <li><i class="el-icon-time"></i><span>最近播放</span></li>
          </ul>
        </div>
        <el-divider direction="vertical"></el-divider>
        <router-link tag='span' :to="{name:'Register'}">注册</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      topInfo: {
        routerPath: ['myFind', 'myMusic', 'movie', 'shop', 'singer', 'changeLanguage'],
        navList: ['我的发现', '我的音乐', '视频', '商城', '音乐人', '彝汉切换'],
        inputValue: ''
      },
      isnotLogin: false// 这里后期可以使用导航守卫进行判断是否登陆
    }
  },
  methods: {
    Register () {
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/header/topBar.scss";
</style>
