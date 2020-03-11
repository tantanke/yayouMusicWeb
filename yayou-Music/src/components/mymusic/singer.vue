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
              <div class="focus">
                <i class="el-icon-upload2"></i>
                <span>导入歌单</span>
              </div>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </div>
    <el-row class="singersonglist">
      <el-row class="title">
        <ul>
          <li class="active" tag='li' :to="{name:'singerInfo',params:{singerid:1}}">单曲</li>
          <li>MV</li>
          <li>简介</li>
        </ul>
      </el-row>
      <el-row class="list">
         <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column prop="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="song" label="歌曲" width="650">
          <template slot-scope="scope">
            <span>{{ scope.row.song }}</span>
            <span class="vip">vip</span>
            <span class='dujia'>独家</span>
            <span class="movie">MV</span>
        </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="250">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="200"></el-table-column>
        <el-table-column prop="time" label="时长" width='100'></el-table-column>
      </el-table>
      </el-row>
    </el-row>
    <!-- <el-row>
       <router-view></router-view>
    </el-row> 后面需要的话就写上 -->
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination :page-size="30" :pager-count="6" layout="prev, pager, next" :total="600"></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songTableData: [
        {
          order: 1,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 2,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 3,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 4,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 5,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 6,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 7,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 8,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 9,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 10,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 11,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 12,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 13,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 14,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 15,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 16,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 17,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 18,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 19,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 20,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 21,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 22,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 23,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 24,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 25,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 26,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 27,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 28,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 29,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        },
        {
          order: 30,
          song: '面朝大海',
          singer: '南瑶乐队',
          ed: '第一张单曲专辑',
          time: '04:51'
        }
      ]
    }
  }
}
</script>

<style>
</style>
