<template>
  <div class="yy-topbar">
    <el-row>
      <el-col :span="1" class="yy-logo"></el-col>
      <el-col :span="3" class="yy-title"><router-link tag='span' :to="{name:'find'}">涯悠音乐</router-link></el-col>
      <el-col :span="11" class="yy-toplist">
        <ul class="nav" >
          <router-link tag='li'  :to="{name:'find'}"><div>我的发现</div></router-link>
          <router-link tag='li'  :to="{name:'myMusic'}"><div>我的音乐</div></router-link>
          <router-link tag='li'  :to="{name:'movie'}"><div>视频</div></router-link>
          <router-link tag='li'  :to="{name:'shop'}"><div>商城</div></router-link>
          <router-link tag='li'  :to="{name:'singer'}"><div>音乐人</div></router-link>
          <li @click="changeLangEvent"><div>彝汉切换</div></li>
        </ul>
      </el-col>
      <el-col :span="6" class="yy-topsearch" id="topsearch"><!--这个id值是用来触发鼠标enter（键值为13）键的 @keyup.enter.native="entersearch" -->
        <el-input v-model="topInfo.inputValue" placeholder="音乐、电影、商城、音乐人" @keyup.enter.native="entersearch"></el-input>
        <router-link tag="i" class="el-icon-search" @click.native="firstPageSearch()" :to="{name:'search',params:{val:this.topInfo.inputValue}}"></router-link>
      </el-col>
      <el-col :span="3" class="yy-login">
        <div v-if="notLogin">
          <el-dialog title="账号密码登陆" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll='false' width="380px">
            <dia-log v-bind:isnotLogin = "isnotLogin" v-on:success = "success(res)" class="loginarea"></dia-log>
          </el-dialog>
          <span round @click="submitForm()" class='login' style="cursor: pointer;">登录</span>
        </div>
        <div class="loginPic" v-else>
          <img :src="headImgUrl" alt="头像">
          <ul>
            <router-link tag='li' class="active" :to="{name:'myMusic'}"><i class="el-icon-user"></i><span>个人中心</span></router-link>
            <li><i class="el-icon-chat-dot-round"></i><span>我的消息</span></li>
            <router-link tag="li" :to="{name:'setting'}"><i class="el-icon-s-custom"></i><span>我的设置</span></router-link>
            <router-link tag='li' :to="{name:'member'}"><i class="el-icon-service"></i><span>VIP会员</span></router-link>
            <li><i class="el-icon-s-order"></i><span>我的收藏</span></li>
            <li><i class="el-icon-lollipop"></i><span>我的歌单</span></li>
            <li><i class="el-icon-wind-power"></i><span>我的下载</span></li>
            <li><i class="el-icon-time"></i><span>最近播放</span></li>
            <router-link tag='li' :to="{name:routercreatecentre}" @click.native="clickR"><i class="el-icon-service"></i><span  v-if="!singer">艺人注册</span><span v-else>创作中心</span></router-link>
          </ul>
        </div>
        <el-divider direction="vertical"></el-divider>
        <span @click="register()" v-if="notLogin" style="cursor: pointer;">注册</span>
        <span @click="loginOut" v-else style="cursor: pointer;">注销</span>
        <el-dialog title="注册" :visible.sync="isnotShow" center :append-to-body='true' :lock-scroll='false' width="400px">
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
      headImgUrl: require('../../assets/img/image/组4.png'), // 头像地址
      routercreatecentre: 'createCentre', // 创作中心进入口
      dialogTableVisible: false,
      isnotShow: false,
      topInfo: {
        routerPath: ['myFind', 'myMusic', 'movie', 'shop', 'singer', 'changeLanguage'],
        navList: ['我的发现', '我的音乐', '视频', '商城', '音乐人', '彝汉切换'],
        inputValue: ''
      },
      isnotLogin: true, // 利用父子组件传值
      isSinger: false // 是否已经成为注册音乐人
    }
  },
  computed: {
    notLogin () {
      return this.isnotLogin
    },
    singer () {
      return this.isSinger
    }
  },
  methods: {
    success (res) {
      this.isnotLogin = res
      this.userGetInfo()
      if (window.localStorage.getItem('Role') === 'Singer') {
        this.isSinger = true
      }
    },
    changeLangEvent () {
    },
    submitForm () {
      this.dialogTableVisible = true // 默认页面不显示为false,点击按钮将这个属性变成true
    },
    register () {
      this.isnotShow = true
    },
    /**
     * 退出函数
    */
    loginOut () {
      if (confirm('确认退出吗？')) {
        /* this.$axios({
          method: 'post',
          data: {},
          url: ''
        }).then()
          .catch() */
        window.localStorage.removeItem('Authorization')
        window.localStorage.removeItem('Role')
        this.$message.success('退出成功！')
        this.isnotLogin = true
        this.dialogTableVisible = false
        this.$router.push({
          // 你要跳转的地址
          path: '/find'
        })
      } else {
        this.isnotLogin = false
      }
    },
    /**
     *回车函数
     */
    entersearch () {
      var keyCode = window.event ? event.keyCode : event.which
      if (keyCode === 13) {
        axios({
          url: '/search',
          method: 'post',
          params: {
            'value': this.inputValue,
            'type': 0,
            'pageNum': 1
          }
        })
          .then(this.getSearchResult)
        this.$router.push({name: 'search', params: {input: this.topInfo.inputValue, val: this.topInfo.inputValue}})
      }
    },
    firstPageSearch () {
      var val = this.topInfo.inputValue
      Bus.$emit('inputVal', val)
      axios({
        url: 'http://175.24.83.13:8000/search',
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
    },
    clickR () {
      let role = localStorage.getItem('Role')
      if (role !== 'Singer') {
        this.routercreatecentre = 'registermusician'
        this.$router.push({name: 'registermusician'})
      } else {
        this.routercreatecentre = 'createCentre'
        this.$router.push({name: 'createCentre'})
      }
    },
    userGetInfo () {
      axios({
        url: 'http://175.24.83.13:8000/userInfo/getUserInfo',
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
        }
      }).then(res => {
        console.log(res)
        res = res.data
        if (res.code === 1) {
          if (res.data.userImg) {
            this.headImgUrl = res.data.userImg
          }
        }
      })
    }
  },
  mounted () {
    this.userGetInfo()
    Bus.$on('headImgUrl', url => {
      // 设置resetheadimg.vue发来的
      console.log(url)
      this.headImgUrl = url
    })
    if (window.localStorage.getItem('Authorization')) {
      this.isnotLogin = false
    }
    if (window.localStorage.getItem('Role') === 'Singer') {
      this.isSinger = true
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/public/header/topBar.scss";
.loginout{
  cursor: pointer;
}
</style>
