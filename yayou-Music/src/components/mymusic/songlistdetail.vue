<template>
  <div class="songlist">
    <el-row>
      <el-col :span="10" offset="5">
        <el-row>
          <el-col :span="8" offset="1">
            <img :src="songlistinfo.imgUrl" class="img"/>
          </el-col>
          <el-col :span="14" class="head-info">
            <div :model="songlistinfo.songlistname" class="songlistname"><span>{{songlistinfo.songlistname}}</span></div>
            <div :model="songlistinfo.createdtime" class="createdtime"><span>{{songlistinfo.createdtime}}&nbsp;创建</span></div>
            <div class="icon">
              <i class="el-icon-video-play" title="播放全部"></i>
              <i class="el-icon-video-pause" title="暂停播放"></i>
              <i class="el-icon-collection-tag"  title="收藏歌单"></i>
              <i class="el-icon-share" title="分享歌单"></i>
            </div>
            <el-row tag="div" class="tags">
              <el-col :span="3">标签：</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col :span="25" class="tagi" v-for="(item,index) in songlistinfo.tags" :key="index" tag="span">{{item.tagi}}</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row tag="div" class="intro">
              <el-col :span="4" >介绍：</el-col>
              <el-col :span="20" tag="span" class="spani">
               thbfgngdbvn
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="function">
          <el-col :span="3" class="playall"><i class="el-icon-video-play"></i> 播放全部</el-col>
          <el-col :span="6" :model="songlistinfo.songnumber">曲目数：{{songlistinfo.songnumber}}</el-col>
          <el-col :span="3" offset="12" :model="songlistinfo.playnumber">播放：{{songlistinfo.playnumber}}次</el-col>
        </el-row>
        <el-table
          :data="tableData"
          stripe="true">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            label="曲目标题"
            width="400">
            <template slot-scope="scope">
              <router-link :to="{name:'songdetail', params:{songid: scope.row.id}}" tag="span" >
                {{scope.row.title}}
              </router-link>
              <i class="el-icon-video-play" title="播放"></i>
              <i class="el-icon-video-pause" title="暂停"></i>
              <i class="el-icon-collection-tag"  title="收藏"></i>
              <i class="el-icon-share" title="分享"></i>
              <i class="el-icon-download" title="下载"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="时长"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="歌手"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.singer}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="专辑"
            width="550">
            <template slot-scope="scope">
              <span>{{scope.row.columni}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div id="comment">
          <el-row class="comment-head" tag="div">
            <el-col :span="2" :offset="1" class="head-title">评论</el-col>
            <el-col :span="4" :offset="17" pull="17" v-model="comment.commentnumber">共29{{comment.commentnumber}}条评论</el-col>
          </el-row>
          <div class="my-comment" >
            <img :src="myHeadImgUrl" alt="" class="my-head-img">
            <textarea class="comment-input" placeholder="评论不超过140字" v-model="comment.commentText" ref="count" :maxlength="maxWord"></textarea>
          </div>
          <el-row class="submit-area">
            <el-col :span="1" :offset="18"  class="rest-word" v-model="comment.wordNumber">{{comment.wordNumber}}字</el-col>
            <el-col :span="1"><el-button @click="submitComment" class="ebutton">评论</el-button></el-col>
          </el-row>
          <el-row class="comment-display" v-for="(item, index) in comment.commentDetail" :key="index">
            <el-col :span="2" :offset="1" tag="span" class="comment-img"><img :src="item.headImgUrl" alt="" class="comment-img"></el-col>
            <el-col :span="18" :offset="1">
              <el-row>
                <span :model="item.username" class="username">{{item.username}}:</span>
                <span :model="item.commentContent" class="comment-content">{{item.commentContent}}</span>
              </el-row>
              <el-row class="span-icon">
                <el-col :span="2" v-model="item.conmentTime" >{{item.conmentTime}}</el-col>
                <el-col :span="2" :offset="18"><i class="el-icon-s-comment" title="赞">(14)</i></el-col>
                <el-col :span="0.5"><el-divider direction="vertical"></el-divider></el-col>
                <el-col :span="1"><i class="el-icon-s-comment" title="回复"></i></el-col>
                </el-row>
                <el-divider></el-divider>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4" offset="0" class="right">
        <el-row>
          <span>喜欢这个歌单的人</span>
        </el-row>
        <el-divider direction="line" class="line"></el-divider>
        <el-row >
          <img :src="item.headImgUrli" alt="" srcset="" :title="item.Title" v-for="(item, index) in likeArrary" :key="index">
        </el-row>
        <el-row>
          <span>相关推荐</span>
        </el-row>
        <el-divider direction="line" class="line"></el-divider>
        <el-row v-for="(item, index) in likeArrary" :key="index">
          <el-col :span="6">
            <img :src="item.headImgUrli" alt="" srcset="" :title="item.Title">
          </el-col>
          <el-col :span="16" offset="1">
            <div class="name">{{fdv}}dfgdf</div>
            <div class="ti">{{vfd}}gdfgsd</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maxWord: '140',
      myHeadImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
      comment: {
        commentText: '',
        commentnumber: '',
        wordNumber: '',
        commentDetail: [{
          username: '1',
          headImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
          commentContent: 'qweq',
          conmentTime: '2020/1/1'
        }, {
          username: '2',
          headImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
          commentContent: 'asdd电饭锅电饭dd电饭锅电饭dd电饭锅电饭锅add电饭锅电饭dd电饭锅电饭dd电饭锅电饭dd电饭锅电饭',
          conmentTime: '2020/2/1'
        }, {
          username: '3',
          headImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
          commentContent: 'Zzzxc',
          conmentTime: '2020/3/4'
        }, {
          username: '3',
          headImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
          commentContent: 'Zzzxc',
          conmentTime: '2020/3/4'
        }, {
          username: '6',
          headImgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
          commentContent: 'Zzzxc',
          conmentTime: '2020/3/4'
        }]
      },
      likeArrary: [{
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }, {
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }, {
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }, {
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }, {
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }, {
        headImgUrli: require('../../assets/img/homePage/狂徒(dts版).png'),
        Title: ''
      }],
      songlistinfo: {
        username: '',
        imgUrl: require('../../assets/img/homePage/狂徒(dts版).png'),
        songlistname: '歌单名',
        createdtime: '创建时间',
        songnumber: '50',
        playnumber: '5',
        tags: [{tagi: '华语vbfg'}, {tagi: '流行'}, {tagi: '治愈'}]
      },
      tableData: [{
        id: '000',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '001',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '002',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '003',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '004',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '005',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }, {
        id: '006',
        title: '老男孩',
        time: '3.40',
        singer: '筷子兄弟',
        columni: '老男孩'
      }]
    }
  },
  methods: {
    submitComment () {
      var iDate = new Date()
      var _this = this
      var arr = {
        username: '',
        commentContent: '',
        conmentTime: '',
        headImgUrl: ''
      }
      arr.username = _this.songlistinfo.username
      arr.commentContent = _this.comment.commentText
      arr.conmentTime = iDate.getFullYear
      arr.headImgUrl = _this.comment.myHeadImgUrl
      _this.comment.push(arr)
      console.log(this.comment.commentDetail)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row, column) {
      console.log(index, row, column)
    }
  },
  watch: {
    wordNumber: () => {
      var _this = this
      var L = _this.$refs.count.value.split('').join('').length
      alert(L)
      return L
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mymusic/songlistdetail.scss';
</style>
