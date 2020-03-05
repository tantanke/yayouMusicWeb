<template>
  <div class="mysonglist">
    <el-row class="title">
      <div class="song-list">
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
      <div class="led-songlist">
        <i class="el-icon-upload2"></i>
        <span>导入歌单</span>
      </div>
    </el-row>
    <el-row>
      <el-table :data="songTableData" style="width: 100%" stripe>
        <el-table-column label="歌单" width="700" >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <router-link :to="{name: 'songlistdetail', params:{songlistid: scope.row.id}}" tag="span" style="margin-left: 10px">
              {{ scope.row.songlist }}
              </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="songnum" label="曲目数" width="150"></el-table-column>
        <el-table-column label="收听" width="150">
          <template slot-scope="scope">
            <i class="el-icon-plus"></i>
            <span style="margin-left: 10px">{{ scope.row.listen }}</span>
          </template>
        </el-table-column>
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
          id: '001',
          imgUrl1: 'static/image/发布作品.jpg',
          songlist: '我喜欢',
          songnum: '面朝大海',
          listen: ''
        },
        {
          imgUrl1: 'static/image/发布作品.jpg',
          songlist: '我hgj',
          songnum: '面朝大海',
          listen: ''
        },
        {
          songlist: '我喜欢',
          songnum: '3首',
          listen: '南瑶乐队'
        },
        {
          songlist: '我喜欢',
          songnum: '3首',
          listen: '南瑶乐队'
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

<style lang="scss" scoped>
@import "@/assets/css/mymusic/mycategory/songhascreated.scss";
</style>
