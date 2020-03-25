<template>
  <div class="manage-music">
      <ul class="manage-title">
        <li>管理我发布的专辑</li>
      </ul>
      <ul class="tableTitle">
        <li>创建日期</li>
        <li>作者名</li>
        <li>专辑名</li>
        <li>歌曲数量</li>
        <li>专辑id</li>
        <li>操作</li>
      </ul>
      <el-divider></el-divider>
      <el-table
    :data="allAblum"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="createTime"
      label="创建日期"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      prop="artist"
      label="作者名"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      prop="albumName"
      label="专辑名"
      sortable
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="songNum"
      label="歌曲数量"
      sortable
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="albumId"
      label="专辑Id"
      sortable
      width="320"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="totalLen"
    :page-size='15'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      totalTable: 0,
      nowPage: 1 // 当前页码 默认为一
    }
  },
  computed: {
    allAblum () {
      return this.tableData
    },
    totalLen () {
      return this.totalTable
    }
  },
  methods: {
    // 拿到页码 发送 ajax
    handleCurrentChange (val) {
      let _this = this
      let curPage = val
      _this.tableData = []
      _this.$axios({
        method: 'get',
        url: '/singer/getAlbum',
        // 这里的页码默认为一 singerId在路由中拿到
        params: {pageNum: curPage}
      }).then(res => {
        if (res.data.code === 1) {
          _this.totalTable = res.data.data.total
          res.data.data.list.forEach((item, index) => {
            let albumitem = {}
            albumitem.albumId = item.albumId
            albumitem.albumName = item.albumName
            albumitem.songNum = item.songNum
            albumitem.artist = item.artist
            albumitem.createtime = item.createtime
            _this.tableData.push(albumitem)
          })
        } else {
          _this.$message.error('当前网络繁忙，请刷新后重试！')
        }
      })
      // 由页码数发送ajax请求 渲染数据
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该专辑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 获取该行专辑id 删除之后重新发送ajax获取当页数据
      })
      console.log(row)
    }
  },
  mounted () {
    let _this = this
    _this.$axios.defaults.baseURL = 'http://175.24.83.13:8000'
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
    _this.$axios({
      method: 'get',
      url: '/singer/getAlbum',
      // 这里的页码默认为一 singerId在路由中拿到
      params: {'pageNum': 1}
    }).then(res => {
      if (res.data.code === 1) {
        this.totalTable = res.data.data.total
        res.data.data.list.forEach((item, index) => {
          let albumitem = {}
          albumitem.albumId = item.albumId
          albumitem.albumName = item.albumName
          albumitem.songNum = item.songNum
          albumitem.artist = item.artist
          albumitem.createtime = item.createtime
          _this.tableData.push(albumitem)
        })
      } else {
        alert('当前网络繁忙，请刷新后重试！')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/managemusic.scss";
</style>
