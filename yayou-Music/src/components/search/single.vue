<template>
    <div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
            <el-table-column
              label=""
              width="410">
              <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.song_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="artist" label="" width="230">
            </el-table-column>
            <el-table-column prop="@version" label="" width="220">
            </el-table-column>
            <el-table-column prop="@timestamp" label="" width="120">
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="200"
          @current-change="handleCurrentChange"
          class="number">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [{
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }]
    }
  },
  methods: {
    handleCurrentChange (val) {
      axios({
        url: 'http://175.24.83.13:8000search/result/single',
        method: 'post',
        params: {
          'type': 2,
          'currentPage': val
        }
      })
        .then(this.getHomeInfoSucc)
    },
    getHomeInfo () {
      axios({
        url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=search/result/single',
        method: 'post',
        params: {
          'type': 2,
          'currentPage': 1 /** 每次刚打开页面的时候默认页面一定是第一页 */
        }
      })
        .then(this.getHomeInfoSucc)
    },
    /** 这个函数主要对请求到的数据进行处理 */
    getHomeInfoSucc (res) {
      res = res.data
      this.tableData = res.data.recordList
      console.log(this.tableData)
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
    .el-table__row{
      border-radius: 6px;
    }
    .number{
      margin-top: 50px;
    }
</style>
