<template>
  <div class="numcate">
    <ul class="cate">
      <li>音乐</li>
      <li class="active">视频</li>
      <li>电台</li>
    </ul>
    <el-divider class="line"></el-divider>
    <div class="yesdata">
      <span>昨日数据</span>
      <ul>
        <li>
          <div>播放量</div>
          <div>{{yesData}}</div>
        </li>
        <li>
          <div>点赞数</div>
          <div>{{yesLikes}}</div>
        </li>
        <li>
          <div>评论数</div>
          <div>23</div>
        </li>
        <li>
          <div>收藏数</div>
          <div>{{yesCollect}}</div>
        </li>
        <li>
          <div>分享数</div>
          <div>5</div>
        </li>
        <li class="all">
          <div>累计播放量</div>
          <div>{{totalPlay}}</div>
        </li>
      </ul>
    </div>
    <div class="mostspeed">
      <p class="title">昨七日飙升最快</p>
      <ul>
        <li class="active7">播放数</li>
        <li>点赞数</li>
        <li>评论数</li>
        <li>收藏数</li>
        <li>分享数</li>
        <li></li>
        <li class="active7">近7天</li>
        <li>近30天</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      yesData: '',
      totalPlay: '',
      yesLikes: '',
      yesCollect: ''
    }
  },
  methods: {},
  mounted () {
    let _this = this
    let singerID = '1'
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
    this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
        } else {
          console.log('未登陆')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    _this.$axios.all([
      _this.$axios({
        method: 'get',
        params: {singerID: singerID},
        url: '/singer/s/getYesterdayPlayNum'
      }),
      _this.$axios({
        method: 'get',
        params: {singerID: singerID},
        url: '/singer/s/getTotalPlay'
      }),
      _this.$axios({
        method: 'get',
        params: {singerID: singerID},
        url: '/singer/s/getYesterdayLikes'
      }),
      _this.$axios({
        method: 'get',
        params: {singerID: singerID},
        url: '/singer/s/getYesterdayCollect'
      })
    ]).then(this.$axios.spread((res1, res2, res3, res4) => {
      /* _this.yesData = res1.data.data.昨日播放量
      _this.totalPlay = res2.data.data.累计播放量
      _this.yesLikes = res3.data.data.昨日点赞数
      _this.yesCollect = res4.data.data.收藏数 */
      console.log(res1, res2, res3, res4)
    })).catch(err => {
      console.log(err)
    })
  },
  computed: {}
}
</script>

<style lang="scss">
  @import "@/assets/css/createcentre/main/numinfo.scss";
</style>
