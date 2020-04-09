<template>
    <div class="lyric-father">
        <div class="singlenumber">
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
            <el-collapse accordion>
                <div class="text">
                    <span style="color:#0c73c2">王俊凯：</span>
                    <p>还是一样，</p>
                    <p>太多理所应当让人觉得平常</p>
                    <p>不算太小的房</p>
                </div>
                <el-collapse-item title="展开">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="doublenumber">
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
            <el-collapse accordion>
                <div class="text">
                    <span style="color:#0c73c2">王俊凯：</span>
                    <p>还是一样，</p>
                    <p>太多理所应当让人觉得平常</p>
                    <p>不算太小的房</p>
                </div>
                <el-collapse-item title="展开">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="this.total"
          class="number">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      pageNum: '',
      total: '',
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
      this.pageNum = val
    },
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
      this.total = this.tableData.length
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style>
    .singlenumber{
        margin-top: 0px;
    }
    .el-collapse{
        border-top: none!important;
        border-bottom: none!important;
    }
    .text{
        margin-top: 10px;
        margin-left: 2px;
        font-size: 14px;
        color:#333
    }
    .el-icon-arrow-right{
        margin: 2px auto 0px 2px !important;
    }
    .el-table__header-wrapper{
        display: none!important;
    }
    .el-table td, .el-table th.is-leaf {
        border-top: 1px solid #ebeef5;
    }
    .lyric-father{
        display: block;
        margin-top: 20px;
    }
</style>
