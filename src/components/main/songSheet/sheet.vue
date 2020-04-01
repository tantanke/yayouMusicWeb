<template>
  <div>
    <div class="header-top">
      <ul class="mainListspecial">
        <li><span>推荐</span></li>
        <li><span>排行榜</span></li>
        <li class="active"><span>歌单</span></li>
        <li><span>音乐分类</span></li>
        <li><span>歌手</span></li>
      </ul>
    </div>
    <div class="g-bd">
      <div class="u-title f-cb">
        <h3>
          <span class="f-ff2 d-flag">全部</span>
        </h3>
      </div>
      <el-row :gutter="0" class="fatherSpecial">
        <router-link :to="{name: 'songlistdetail'}">
          <div class="special el-col" :span="5" v-for="(item,i) in aaa" :key=i>
            <div class="grid-content bg-purple">
              <li>
                <div class="u-cover u-cover-1">
                  <img class="j-flag" src="item.cover">
                </div>
                <p class="dec">
                  <router-link :to="{name: 'songlistdetail'}" tag="a" title="item.introduce" href=" " class="tit f-thide s-fc0" style="text-decoration:none">item.introduce</router-link>
                </p>
                <p>
                  <span class="s-fc4">by</span>
                  <router-link :to="{name: 'songlistdetail'}" title="item.author" class="nm nm-icn f-thide s-fc3" style="text-decoration:none">GNC顾念晨</router-link>
                  <sup class="u-icn u-icn-84 "></sup>
                </p>
              </li>
            </div>
          </div>
        </router-link>
      </el-row>
      <div class="bottom-father">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="totalTable"
          class="page-bottom">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      totalTable: 0,
      nowPage: 1,
      aaa: []
    }
  },
  computed: {
    totaLen () {
      return this.totalTable
    }
  },
  methods: {
    // 拿到页码 发送 ajax
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.$axios({
        method: 'get',
        url: 'http://175.24.83.13:8000/hotSongList',
        // 这里的页码默认为一 singerId在路由中拿到
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          _this.totalTable = res.data.data.total
          // 这里缺了一些获取图片和个人信息的
        } else {
          _this.$message.error('当前网络繁忙，请刷新后重试！')
        }
      })
      // 由页码数发送ajax请求 渲染数据
    }
  },
  mounted () {
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
    _this.$axios({
      method: 'get',
      url: '/hotSongList',
      // 这里的页码默认为一 singerId在路由中拿到
      params: {'pageNum': 1}
    }).then(res => {
      if (res.data.code === 1) {
        res = res.data
        console.log(res.data)
        _this.totalTable = res.data
        _this.aaa = res.data.total
      } else {
        alert('当前网络繁忙，请刷新后重试！')
      }
    })
  }
}
</script>
<style>
.mainListspecial {
  position: relative;
  top: -23px;
  list-style: none;
  margin-left:120px;
  float:left
}
.mainListspecial li {
    padding-right: 110px;
    float: left;
}
.mainListspecial .active span {
    border-bottom: 3px solid red;
    font-weight: 800;
}
.bottom-father{
  margin-left:400px;
  margin-top:10px;
}
.el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
.g-bd{
  width: 980px;
  min-height: 700px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  padding: 40px;
}
.header-top{
  position:relative;
  left:80px！important;
}
.u-title{
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}
.u-title h3{
  float: left;
  font-size: 24px;
  font-weight: normal;
}
.special{
  width:20% !important;
  float:left
}
.menu {
  font-size: 12px;
  font-weight: normal;
  margin: 2px 0 0 12px;
  color: #333;
  background-position: right -100px;
}
.f-fr {
  float: right;
}
.a1{
  float: left;
  width: 46px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  color: #fff;
  background-color:red;
  border-radius:2px;
}
.grid-content li {
    float: left;
    display: inline-block;
    width: 155px;
    height: 188px;
    overflow: hidden;
    padding: 0 0 28px 0;
    line-height: 1.4;
    list-style: none;
    margin-top:20px;
}
.u-cover-1 {
    width: 140px;
    height: 140px;
}
.u-cover {
    position: relative;
    display: block;
    line-height: 1.4;
    list-style: none;
}
.u-cover img {
    display: block;
    width: 100%;
    height: 100%;
}
.u-cover .msk {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0 0;
}
.fatherSpecial{
  padding-left:44px !important;
}
.bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background-position: 0 -537px;
    color: #ccc;
}
.icon-play {
    position: absolute;
    right: 10px;
    bottom: 5px;
    width: 16px;
    height: 17px;
    background-position: 0 0;
}
.icon-headset {
    float: left;
    width: 14px;
    height: 11px;
    background-position: 0 -24px;
    margin: 9px 5px 9px 10px;
}
.nb {
    float: left;
    margin: 7px 0 0 0;
}
.dec {
    margin: 8px 0 3px;
    font-size: 14px;
    width: 100%;
}
.s-fc4:hover {
    color: #999;
}
.nm-icn {
  max-width: 76%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.u-icn-84 {
  width: 12px;
  height: 13px;
  background-position: -65px -840px;
}
</style>
