<template>
  <div class="manage-music">
      <ul class="manage-title">
        <li>管理我发布的专辑</li>
      </ul>
      <el-divider></el-divider>
      <el-table
    :data="tableData"
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
      prop="ablumName"
      label="专辑名"
      sortable
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="isVip"
      label="是否VIP(1是 0不是)"
      sortable
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="des"
      label="专辑描述"
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
    :total="tableData.length"
    :page-size='15'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        ablumName: '想你的夜',
        songName: '哈哈',
        artist: '不知道是谁',
        createTime: '2016-05-04',
        isVip: '1',
        des: '这是专辑描述'
      }, {
        ablumName: '想你的夜',
        songName: '哈哈',
        artist: '知道是谁',
        createTime: '2016-05-04',
        isVip: '1',
        des: '这是专辑描述'
      }, {
        ablumName: '想你的夜',
        songName: '哈哈',
        artist: '道是谁',
        createTime: '2016-05-04',
        isVip: '1',
        des: '这是专辑描述'
      }, {
        ablumName: '想你的夜',
        songName: '哈哈',
        artist: '是谁',
        createTime: '2016-05-04',
        isVip: '1',
        des: '这是专辑描述'
      }]
    }
  },
  methods: {
    // 拿到页码 发送 ajax
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 由页码数发送ajax请求 渲染数据
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
    this.$axios({
      method: 'get',
      url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/getSingerAlbum',
      // 这里的页码默认为一 singerId在路由中拿到
      data: {singerId: 1, pageNum: 1}
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/main/managemusic.scss";
</style>
