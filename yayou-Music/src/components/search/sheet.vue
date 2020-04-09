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
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="" width="230">
            </el-table-column>
            <el-table-column prop="address" label="" width="220">
            </el-table-column>
            <el-table-column prop="time" label="" width="120">
            </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="200"
          class="number">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getHomeInfo () {
      axios({
        url: 'http://175.24.83.13:8000/hotMv',
        method: 'get',
        params: {
          'type': 2
        }
      })
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      console.log(res)
      this.tableData = res.data
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
      margin-left: 280px;
    }
</style>
