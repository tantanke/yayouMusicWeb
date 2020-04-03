<template>
  <div class="composer">
    <el-row tag="div" class="head">
      <el-col :span="16">艺人信息</el-col>
    </el-row>
    <el-row tag="div" class="main">
      <el-col :span="10" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="艺人名：" prop="name">
          <el-input v-model="ruleForm.name1" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="艺人照片：" prop="name">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            disabled>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        <el-form-item label="性别：" >
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="男" disabled></el-radio>
            <el-radio label="女" disabled></el-radio>
            <el-radio label="团体" disabled></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区：" prop="region">
          <el-col :span="6" :offset="6" pull="6">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域" disabled>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域3" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="6" pull="6">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域" disabled>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="流派风格" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" disabled="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="3" :offset="2">
        <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        disabled>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: 'http://175.24.83.13:8000/singer/getSingerInfo',
      active: 0,
      urls: {
        info: ''
      },
      ruleForm: {
        singerName: '',
        province: '',
        city: '',
        sex: '',
        style: '',
        photo: '',
        headImg: ''
      },
      rules: {
      }
    }
  },
  methods: {
  },
  mounted: () => {
    var _this = this
    this.$axios.post(this.urls.info)
      .then(res => {
        console.log(res)
        if (res.data.code === 1) {
          var data = res.data.data
          _this.ruleForm.singerName = data.singerName
          _this.ruleForm.province = data.province
          _this.ruleForm.city = data.city
          _this.ruleForm.sex = data.sex
          _this.ruleForm.style = data.style
          _this.ruleForm.headImg = data.headImg
          _this.ruleForm.photo = data.photo
        } else {
          this.$message.err('res.data.msg')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/createcentre/header/personalinfor.scss";
</style>
