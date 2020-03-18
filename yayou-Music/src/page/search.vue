<template>
    <div class="father">
        <div class="son-search">
            <input class="search-text" id="p1">
            <a class="search-login" value="搜素">搜索</a>
        </div>
        <div class="son-nav">
            <el-tabs v-model="activeName" type="card" class="nav-title">
                <el-tab-pane label="单曲" name="first" class="nav-li">
                    <single></single>
                </el-tab-pane>
                <el-tab-pane label="歌手" name="second" class="nav-li">
                    <singer></singer>
                </el-tab-pane>
                <el-tab-pane label="专辑" name="third" class="nav-li">
                    <edition></edition>
                </el-tab-pane>
                <el-tab-pane label="视频" name="fourth" class="nav-li">
                    <vide></vide>
                </el-tab-pane>
                <el-tab-pane label="歌词" name="forth" class="nav-li">
                    <lyric></lyric>
                </el-tab-pane>
                <el-tab-pane label="歌单" name="sixth" class="nav-li">
                    <sheet></sheet>
                </el-tab-pane>
            </el-tabs>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import single from '@/components/search/single.vue'
import edition from '@/components/search/edition.vue'
import vide from '@/components/search/vide.vue'
import lyric from '@/components/search/lyric.vue'
import sheet from '@/components/search/sheet.vue'
import singer from '@/components/search/singer.vue'
import Bus from '../components/header/bus.js'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    single,
    edition,
    vide,
    lyric,
    sheet,
    singer
  },
  methods: {
    putdatain () {
      document.getElementById('p1').value = this.$route.params.input
      Bus.$on('inputVal', (data) => {
        console.log(data)
        document.getElementById('p1').value = data
      })
    }
  },
  mounted () {
    this.putdatain()
  }
}
</script>

<style>
  .father{
    width: 980px;
    min-height: 700px;
    margin: 0 auto;
    background-color:#fff;
    border: 1px solid #d3d3d3;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-width: 0 0px;
    padding: 40px;
    position: relative;
    top: -20px;
    }
  .son-search{
    position: relative;
    width: 420px;
    height: 40px;
    margin: 0 auto;
    background-position: 0 0;
    z-index: 10;
    background: url("../assets/img/homePage/search乱.png") no-repeat;
    margin-bottom: 70px;
   }
   .search-text{
      opacity: 1;
      float: left;
      width: 320px;
      height: 17px;
      margin: 12px 0 0 20px;
      padding: 0px;
      background: #fff;
      border: none;
      font-size: 12px;
      color: #333;
   }
   .search-login{
       float:right;
       width: 50px;
       height: 40px;
       text-indent: -9999px;
       cursor: pointer;
   }
   .el-tabs__nav{
       float: none!important;
   }
   .el-tabs__item{
       width: 16.8%;
       text-align: center;
   }
</style>
