<template>
<div>
<div class="singer-recommend" v-loading="loading" v-if="click">
    <el-row class='singerCategory'  >
       <ul>
         <li class="all active"><span>全部</span></li>
         <li class="man"><span>男</span></li>
         <li class="woman"><span>女</span></li>
         <li class="band"><span>组合</span></li>
       </ul>
    </el-row>
    <el-row class="firstName">
      <ul>
        <li class='hot active'>热门</li>
        <li v-for="(item,index) in nameList" :key="index"><span>{{ item }}</span></li>
      </ul>
    </el-row>
    <el-row class='singerCard' ><!-- 动态路由-->
      <div  v-for='(item,index) in allSingerTable' :key="index" @click="getData($event,item.singerId)">
      <img src="../../assets/img/homePage/说比阿达.png" alt="">
      <span>{{item.singerName}}</span>
      </div>
    </el-row>
    <el-row><!--这里的分页采用后端分页 数据较多 -->
      <el-pagination
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="totalLen"
    :page-size='30'>
    </el-pagination>
      </el-row>
      <router-view></router-view>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      nameList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      click: true,
      totalTable: 15,
      tableData: []
    }
  },
  computed: {
    isClick () {
      return this.click
    },
    totalLen () {
      return this.totalTable
    },
    allSingerTable () {
      return this.tableData
    }
  },
  methods: {
    getData (e, singerId) {
      console.log(singerId)
      this.$router.push({name: 'singerDetail', params: {singerid: singerId}})
    },
    isClickSinger () {
      this.click = false
    },
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.tableData = []
      _this.loading = true
      _this.$axios({
        method: 'get',
        url: '/singers',
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res)
          _this.totalTable = res.data.data.total
          res.data.data.list.forEach((item, index) => {
            let singeritem = {}
            // 差个专辑名
            singeritem.singerId = item.singerId
            singeritem.singerName = item.artistName
            singeritem.photo = item.photo
            _this.tableData.push(singeritem)
          })
        } else {
          this.$message.error('当前网络繁忙，请稍后再试！')
        }
        _this.loading = false
      })
    }
  },
  mounted () {
    this.click = true
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000' // 'http://175.24.83.13:8000'
    _this.$axios.create({
      withCredentials: true
    })
    _this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    _this.loading = true
    _this.$axios({
      method: 'get',
      url: '/singers',
      params: {pageNum: 1}
    }).then(res => {
      if (res.data.code === 1) {
        console.log(res)
        _this.totalTable = res.data.data.total
        res.data.data.list.forEach((item, index) => {
          let singeritem = {}
          // 差个专辑名
          singeritem.singerId = item.singerId
          singeritem.singerName = item.artistName
          singeritem.photo = item.photo
          _this.tableData.push(singeritem)
          _this.loading = false
        })
      } else {
        this.$message.error('当前网络繁忙，请稍后再试！')
        _this.loading = false
      }
    })
  }
}
</script>

<style>

</style>
