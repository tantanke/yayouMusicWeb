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
      tableData: [{
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }, {
        date: '树读',
        name: '王俊凯/林可欣',
        address: '《我想和你唱 第二季》',
        time: '03:10'
      }]
    }
  },
  methods: {
    getHomeInfo () {
      axios({
        url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/hotMv',
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
