<template>
    <div class="yy-mainContent">
      <div>
        <ul class="rankheader">
          <li class="active"><span>推荐</span></li>
          <li><span>排行榜</span></li>
          <li><span>歌单</span></li>
          <li><span>音乐分类</span></li>
          <li><span>歌手</span></li>
        </ul>
      </div>
      <div class="g-wrap p-pl f-pr">
        <div class="u-title f-cb">
          <h3><span class="f-ff2 d-flag">家族人气榜</span></h3>
        </div>
        <ul class="m-cvrlst f-cb" id="m-pl-container">
          <li v-for="item in list" :key="item">
            <div class="u-cover u-cover-1">
            <img class="j-flag" src="http://p2.music.126.net/m15gigzeDx_E_Tka7nQXfw==/109951164738447161.jpg?param=140y140">
            <a title="致向阳而生的你：穿越黑暗，来日可期" href="/playlist?id=4879847497" class="msk"></a>
            <div class="bottom">
            <a class="icon-play f-fr" title="播放" href="javascript:;" data-res-type="13" data-res-id="4879847497" data-res-action="play"></a>
            <span class="icon-headset"></span>
            <span class="nb">99626</span>
            </div>
            </div>
            <p class="dec">
            <a title="致向阳而生的你：穿越黑暗，来日可期" href="/playlist?id=4879847497" class="tit f-thide s-fc0">致向阳而生的你：穿越黑暗，来日可期</a>
            </p>
            <p><span class="s-fc4">by</span> <a title="蜜糖男孩" href="/user/home?id=1650191296" class="nm nm-icn f-thide s-fc3">蜜糖男孩</a> <sup class="u-icn u-icn-84 "></sup>
            </p>
          </li>
        </ul>
        <el-row class="pagination">
          <el-col :span="6" :offset="10"><el-pagination background layout="prev, pager, next" :total="40"></el-pagination></el-col>
        </el-row>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/familyRank/all')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        this.list = res.data
      }
      console.log(res)
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
  .rankheader{
    position: relative;
    top: -23px;
    padding-bottom: 25px;
    list-style: none;
    margin-left: 80px;
  }
  .rankheader li {
    padding-right: 110px;
    float: left;
  }
  .active span{
    border-bottom: 3px solid red;
  }
  .g-wrap{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    background-color:#fff;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-width: 0 1px;
    padding: 40px;
  }
  .f-pr{
    position: relative;
  }
  .u-title {
    height: 40px;
    border-bottom: 2px solid #DCDFE6
  }
  .u-title h3{
    float: left;
    font-size: 24px;
    font-weight: normal;
  }
  .u-btn-hot{
    height: 29px;
    border-radius: 3px;
    float: right;
  }
  .m-cvrlst {
    margin: 30px 0 0 -50px;
  }
  .m-cvrlst li{
    float: left;
    width: 140px;
    height: 188px;
    overflow: hidden;
    padding: 0 0 30px 50px;
    line-height: 1.4;
  }
  .u-cover-1 {
    width: 140px;
    height: 140px;
    line-height: 1.4;
    position: relative;
    display: block;
  }
  .u-cover-1 img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .msk {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    width: 100%;
    margin: 8px 0 3px;
    font-size: 14px;
  }
  .tit {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #000;
    cursor: pointer;
  }
  .s-fc4:hover {
    color: #999;
  }
</style>
