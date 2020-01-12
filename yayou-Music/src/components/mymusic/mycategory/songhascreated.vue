<template>
  <div class="mysonglist">
    <el-row class="title">
      <div>
        <i class="el-icon-plus"></i>
        <span @click="dialogFormVisible = true">新建歌单</span>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
      </div>
      <div>
        <i class="el-icon-upload2"></i>
        <span>导入歌单</span>
      </div>
    </el-row>
    <el-row>
      <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column prop="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="song" label="歌曲" width="320">
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="150">
        </el-table-column>
        <el-table-column prop="ed" label="专辑" width="180"></el-table-column>
        <el-table-column prop="time" label="时长" width='70'></el-table-column>
      </el-table>
    </el-row>
    <span @click="dialogFormVisible = true"></span>
        <el-dialog title="歌单名字" center :visible.sync="dialogFormVisible">
        <el-form :model="form">
        <el-form-item label="歌单名字" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
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
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style>
</style>
