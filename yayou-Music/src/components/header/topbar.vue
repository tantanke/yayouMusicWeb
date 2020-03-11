<template>
  <div class="yy-topbar">
    <el-row>
      <el-col :span="1" class="yy-logo"></el-col>
      <el-col :span="3" class="yy-title"><router-link tag='span' :to="{path:'/index'}">涯悠数据</router-link></el-col>
      <el-col :span="11" class="yy-toplist">
        <ul class="nav" >
          <router-link tag='li'  :to="{name:'find'}"><div>我的发现</div></router-link>
          <router-link tag='li'  :to="{name:'myMusic'}"><div>我的音乐</div></router-link>
          <router-link tag='li'  :to="{name:'movie'}"><div>视频</div></router-link>
          <router-link tag='li'  :to="{name:'shop'}"><div>商城</div></router-link>
          <router-link tag='li'  :to="{name:'singer'}"><div>音乐人</div></router-link>
          <router-link tag='li' @click="changeLangEvent" :to="{name:'singer'}"><div>彝汉切换</div></router-link>
        </ul>
      </el-col>
      <el-col :span="6" class="yy-topsearch" id="topsearch"><!--这个id值是用来触发鼠标enter（键值为13）键的 @keyup.enter.native="entersearch" -->
        <el-input v-model="topInfo.inputValue" placeholder="音乐、电影、商城、音乐人"></el-input>
        <router-link tag="i" class="el-icon-search" @click.native="firstPageSearch()" :to="{name:'search',params:{val:this.topInfo.inputValue}}"></router-link>
      </el-col>
      <el-col :span="3" class="yy-login">
        <div v-if="isnotLogin">
          <el-dialog title="账号密码登陆" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll='false' width="20%">
            <dia-log></dia-log>
          </el-dialog>
          <span round @click="submitForm()" class='login'>登录</span>
        </div>
        <div class="loginPic" v-else>
          <img src="../../assets/img/homePage/sliderPic.png" alt="">
          <ul>
            <router-link tag='li' class="active" :to="{name:'myMusic'}"><i class="el-icon-user"></i><span>个人中心</span></router-link>
            <li><i class="el-icon-chat-dot-round"></i><span>我的消息</span></li>
            <li><i class="el-icon-s-custom"></i><span>我的设置</span></li>
            <router-link tag='li' :to="{name:'member'}"><i class="el-icon-service"></i><span>VIP会员</span></router-link>
            <li><i class="el-icon-s-order"></i><span>我的收藏</span></li>
            <li><i class="el-icon-lollipop"></i><span>我的歌单</span></li>
            <li><i class="el-icon-wind-power"></i><span>我的下载</span></li>
            <li><i class="el-icon-time"></i><span>最近播放</span></li>
          </ul>
        </div>
        <el-divider direction="vertical"></el-divider>
        <span @click="register()">注册</span>
        <el-dialog title="注册" :visible.sync="isnotShow" center :append-to-body='true' :lock-scroll='false' width="30%">
          <register></register>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DiaLog from './dialog.vue'
import Register from './register.vue'
import axios from 'axios'
import Bus from './bus.js'
export default {
  components: {
    DiaLog,
    Register
  },
  name: 'MyFind',
  data () {
    return {
      dialogTableVisible: false,
      isnotShow: false,
      topInfo: {
        routerPath: ['myFind', 'myMusic', 'movie', 'shop', 'singer', 'changeLanguage'],
        navList: ['我的发现', '我的音乐', '视频', '商城', '音乐人', '彝汉切换'],
        inputValue: ''
      },
      isnotLogin: true // 这里后期可以使用导航守卫进行判断是否登陆
    }
  },
  methods: {
    changeLangEvent () {
    },
    submitForm () {
      this.dialogTableVisible = true // 默认页面不显示为false,点击按钮将这个属性变成true
    },
    register () {
      this.isnotShow = true
    },
    /**
     *回车函数
     */
    entersearch () {
      var keyCode = window.event ? event.keyCode : event.which
      if (keyCode === 13) {
        axios({
          url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/search',
          method: 'post',
          params: {
            'value': this.inputValue,
            'type': 0,
            'pageNum': 1
          }
        })
          .then(this.getSearchResult)
        if (this.topInfo.inputValue !== ' ') {
          this.$router.push({name: 'search', params: {input: this.topInfo.inputValue, val: this.topInfo.inputValue, define: '1'}})
        }
      }
    },
    firstPageSearch () {
      var val = this.topInfo.inputValue
      Bus.$emit('inputVal', val)
      axios({
        url: 'http://yayoutest.utools.club/search',
        method: 'post',
        params: {
          'value': this.inputValue,
          'type': 0, /** 当搜索的时候无论输入什么都默认返回0 */
          'pageNum': 3
        }
      })
        .then(this.getSearchResult)
    },
    getSearchResult (res) {
      res = res.data
      console.log(res)
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/public/header/topBar.scss";
</style>
