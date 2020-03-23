<template>
  <div class="aboutsinger">
    <div class="like-singer">
      <el-row class="singer-info"><!-- 这里为动态路由跳转获歌手信息-->
        <el-col :span="5">
          <img src="../../assets/img/homePage/说比阿达.png" alt />
        </el-col>
        <el-col :span="19">
          <dl>
            <dt>说比阿达</dt>
            <dd class="singerinfo">
              <!--这里所有信息可用{{}}填入 -->
              <div>
                别名:汉名
                <span>莫春林</span>
                国籍:
                <span>中国</span>
                出生地:
                <span>四川凉山州</span>
                职业:
                <span>彝族音乐人，歌手</span>
                代表作品:
                <span>彝族歌曲《不要怕》,《就要怕》</span>
              </div>
              <span class="more">[更多]</span>
              <span class="complain">[举报]</span>
            </dd>
            <dd class="songinfo">
              <span>单曲&ensp;855</span>
              <el-divider direction="vertical"></el-divider>
              <span>专辑&ensp;34</span>
              <el-divider direction="vertical"></el-divider>
              <span>MV&ensp;1385</span>
            </dd>
            <dd class="singerbutton">
              <div class="singervideoplay active">
                <i class="el-icon-upload2"></i>
                <span>播放歌手热门歌曲</span>
              </div>
              <div class="focus" @click="focus">
                <i class="el-icon-plus"></i>
                <span>关注21.0万</span>
              </div>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </div>
    <el-row class="singersonglist">
      <el-row class="title">
        <ul>
          <li>单曲</li>
          <li>MV</li>
          <li>简介</li>
        </ul>
      </el-row>
      <el-row class="list">
         <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column prop="order" label="歌曲id" width="70"></el-table-column>
        <el-table-column prop="song" label="歌曲(点击歌曲名播放)" width="650">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="{name: 'musicplayer',params: {isvip:scope.row.isvip, songId: scope.row.order}}" style="cursor:pointer">{{ scope.row.song }}</router-link>
            <span class="vip">vip</span>
            <span class='dujia'>独家</span>
            <span class="movie">MV</span>
        </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="250">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="200"></el-table-column>
        <el-table-column prop="isvip" label="是否vip" width='100'></el-table-column>
      </el-table>
      </el-row>
    </el-row>
    <!-- <el-row>
       <router-view></router-view>
    </el-row> 后面需要的话就写上 -->
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="30"  layout="prev, pager, next" :total="6"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
let tAxios = axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  data () {
    return {
      singerId: '',
      urls: {
        focus: '/user/subscribeSinger'
      },
      songTableData: [
        {
          order: 1,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 0
        },
        {
          order: 2,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 3,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 0
        },
        {
          order: 4,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 5,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        },
        {
          order: 6,
          song: '等雨停',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          isvip: 1
        }
      ]
    }
  },
  methods: {
    focus () {
      tAxios.post(this.urls.focus, JSON.stringify({
        singerId: this.singerId
      }))
        .then(res => {
          console.log(res)
          if (res.data.code === '1') {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else if (res.data.code === '401') {
            localStorage.removeItem('Authorization')
            this.$router.push('/login')
          } else {
            if (res.data.msg) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.error('请稍后尝试')
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted: () => {
    var _this = this
    _this.singerId = this.$route.params.singerid
  }
}
</script>

<style>
</style>
