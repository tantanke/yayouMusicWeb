<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <!-- <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
        </el-upload> -->
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="#"
          :limit="1"
          :headers="tokenHeader"
          :on-progress="onProgress"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <el-progress v-if="loadingHeadImg" type="circle" :percentage="num" style="margin:10px 10px;"></el-progress>
          <img v-else-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else>
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
        <el-form-item prop="name" label-width="0">
            <el-input placeholder="用户名" v-model="ruleForm.name" >
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="phone" label-width="0">
          <el-input placeholder="电话号码" v-model="ruleForm.phone">
              <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="cipher" label-width="0">
            <el-input type="password" placeholder="密码" v-model="ruleForm.cipher">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item label="家族" class="familyId" prop="value">
          <el-select v-model="ruleForm.value" clearable placeholder="请选择" class="familyidBox" style="width: 160px;">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required class="birthday">
          <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 160px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="性别" prop="resource" class="sex">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="email" label-width="0px">
            <el-input placeholder="验证码" v-model="ruleForm.email" style="width:300px">
                <template slot="append"><el-button @click="getEmail(), ajust()">发送验证码</el-button></template>
            </el-input>
        </el-form-item>
        <el-form-item class="bottom-re" label-width="0">
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios'
import * as qiniu from 'qiniu-js'
export default {
  data () {
    var checkPhoneNumber = (rule, value, callback) => {
      console.log(this.ruleForm.phone)
      axios({
        url: 'http://175.24.83.13:8000/findUserExist',
        method: 'get',
        params: {
          'userPhone': this.ruleForm.phone
        }
      })
        .then(function (res) {
          console.log(res)
          res = res.data
          if (res.code === 1) {
            return callback()
          }
        }, function (error) {
          if (error.response.status === 409) {
            return callback(new Error('该电话号码已经注册'))
          }
        })
        .catch(err => {
          console.log(err)
        })
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('请输入正确的电话号码'))
      }
    }
    var dateCheck = (rule, value, callback) => {
      if (value) {
        console.log(value)
        let date = new Date(value)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        console.log(year)
        console.log(month)
        console.log(day)
        this.date = year + '-' + (parseInt(month) + 1) + '-' + day
        return callback()
      }
    }
    return {
      dataCode: String,
      date: '',
      imageUrl: '',
      imgFile: '',
      num: 0,
      loadingHeadImg: false,
      tokenHeader: '',
      upToken: '',
      domain: '',
      config: {useCdnDomain: true, region: qiniu.region.z0},
      putExtra: {
        fname: '',
        params: {},
        mimeType: null
      },
      urls: {
        getUpToken: 'http://175.24.83.13:8000/getUpToken',
        qiNiuYun: 'http://upload.qiniup.com/'
      },
      /** options里面是家族的值 */
      options: [{
        label: '[无]',
        options: [{
          value: 'no',
          label: '无'
        }]
      }, {
        label: '[诺合姓氏]',
        options: [{
          value: 'wazha',
          label: 'ꃪꍈ（瓦渣）'
        }, {
          value: 'limi',
          label: 'ꇈꂥ（倮米）'
        }, {
          value: 'reyi',
          label: 'ꌺꒉ（惹依）'
        }, {
          value: 'bosi',
          label: 'ꀨꏂ（博史）'
        }, {
          value: 'nigu',
          label: 'ꑌꈭ（尼古）'
        }, {
          value: 'jibo',
          label: 'ꐛꀨ（吉博）'
        }, {
          value: 'zuer',
          label: 'ꍘꇐ（竹尔）'
        }, {
          value: 'Mese',
          label: 'ꃀꌝ（莫色）'
        }, {
          value: 'baqie',
          label: 'ꁠꏼ（八且）'
        }, {
          value: 'reni',
          label: 'ꌺꑌ（惹尼）'
        }, {
          value: 'reke',
          label: 'ꌭꈈ（热柯）'
        }, {
          value: 'luohong',
          label: 'ꇊꉙ（罗洪）'
        }, {
          value: 'Buyue',
          label: 'ꁮꒀ（布约）'
        }, {
          value: 'shuoge',
          label: 'ꎰꇭ（硕各）'
        }, {
          value: 'mese',
          label: 'ꌋ（莫色）'
        }, {
          value: 'Aer',
          label: 'ꀋꇐ（阿尔）'
        }, {
          value: 'eqi',
          label: 'ꀒꐕ（俄其）'
        }, {
          value: 'Bizi',
          label: 'ꁵꋪ（彼兹）'
        }, {
          value: 'jinqv',
          label: 'ꐚꐎ（金曲）'
        }, {
          value: 'mesou',
          label: 'ꃀꎵ（莫首）'
        }, {
          value: 'waku',
          label: 'ꃪꈐ（瓦苦）'
        }, {
          value: 'jiana',
          label: 'ꐞꇁ（甲纳）'
        }, {
          value: 'qingji',
          label: 'ꏼꐯ（青吉）'
        }, {
          value: 'awu',
          label: 'ꀋꃱ（阿乌） '
        }, {
          value: 'ani',
          label: 'ꀋꆀ（阿呢）'
        }, {
          value: 'een',
          label: 'ꇐꉬ（尔恩）'
        }, {
          value: 'ajing',
          label: 'ꀉꏢ（阿京）'
        }, {
          value: 'buse',
          label: 'ꁮꌋ（布色）'
        }, {
          value: 'atu',
          label: 'ꀋꄳ（阿图）'
        }, {
          value: 'hala',
          label: 'ꉐꇁ（哈拉）'
        }, {
          value: 'mudi',
          label: 'ꃅꄹ（木迪）'
        }, {
          value: 'nuojv',
          label: 'ꆈꏲ（诺局）'
        }, {
          value: 'shama',
          label: 'ꎭꂵ（沙马）'
        }, {
          value: 'jijue',
          label: 'ꐞꏪ（吉觉）'
        }, {
          value: 'jier',
          label: 'ꐛꐊ（吉额）'
        }, {
          value: 'jizi',
          label: 'ꐛꊪ（吉子）'
        }, {
          value: 'sizi',
          label: 'ꌥꌅ（斯兹）'
        }, {
          value: 'erle',
          label: 'ꊉꆺ（俄勒）'
        }, {
          value: 'mupa',
          label: 'ꃅꁁ（木帕）'
        }, {
          value: 'shenbo',
          label: 'ꎸꁈ（沈波）'
        }, {
          value: 'honggan',
          label: 'ꉘꇤ（洪甘）'
        }, {
          value: 'enzha',
          label: 'ꈞꎖ（恩扎）'
        }, {
          value: 'ahou',
          label: 'ꀋꉻ（阿候）'
        }, {
          value: 'shujia',
          label: 'ꌠꈚ（苏呷）'
        }, {
          value: 'bibu',
          label: 'ꀗꁮ（比布）'
        }, {
          value: 'jidi',
          label: 'ꐛꄃ（吉狄）'
        }, {
          value: 'hainai',
          label: 'ꉊꆽ（海乃）'
        }, {
          value: 'refu',
          label: 'ꌺꃘ（惹夫）'
        }, {
          value: 'ale',
          label: 'ꀊꆺ（阿勒）'
        }, {
          value: 'najia',
          label: 'ꇂꏦ（纳甲）'
        }, {
          value: 'teyi',
          label: 'ꄮꒉ（特依）'
        }, {
          value: 'tiyi',
          label: 'ꄜꑳ（体依）'
        }, {
          value: 'azhong',
          label: 'ꀉꍏ（阿仲）'
        }, {
          value: 'meke',
          label: 'ꃀꈈ（莫柯）'
        }, {
          value: 'ashu',
          label: 'ꀉꌠ（阿苏）'
        }, {
          value: 'shudu',
          label: 'ꌣꄖ（苏堵）'
        }, {
          value: 'erzhi',
          label: 'ꇐꊫ（尔字）'
        }, {
          value: 'jibi',
          label: 'ꐚꀘ（吉比）'
        }, {
          value: 'nuoer',
          label: 'ꆈꆊ（诺额）'
        }, {
          value: 'jiashu',
          label: 'ꏦꌠ（甲苏）'
        }, {
          value: 'geer',
          label: 'ꈩꇐ（格尔）'
        }, {
          value: 'jiyue',
          label: 'ꐚꑕ（吉约）'
        }, {
          value: 'laia',
          label: 'ꆜꊂ（来阿）'
        }, {
          value: 'pacha',
          label: 'ꁁꍣ（扒查）'
        }, {
          value: 'aer',
          label: 'ꀋꊉ（阿俄）'
        }, {
          value: 'relai',
          label: 'ꌺꅮ（惹来）'
        }, {
          value: 'gewu',
          label: 'ꈾꃷ（格乌）'
        }, {
          value: 'yibi',
          label: 'ꑱꀘ（依比）'
        }, {
          value: 'shengbu',
          label: 'ꌜꁮ（省布）'
        }, {
          value: 'Ani',
          label: 'ꀋꑍ（阿尼）'
        }]
      }, {
        label: '[曲诺姓氏]',
        options: [{
          value: 'sizi',
          label: 'ꌦꌅ（斯兹）'
        }, {
          value: 'aer',
          label: 'ꀋꇐ（阿尔）'
        }, {
          value: 'budian',
          label: 'ꁱꄅ（布滇）'
        }, {
          value: 'keqi',
          label: 'ꇭꐔ（克其）'
        }, {
          value: 'buer',
          label: 'ꁱꆫ（布尔）'
        }, {
          value: 'qingji',
          label: 'ꏾꐚ（青吉）'
        }, {
          value: 'buhe',
          label: 'ꁮꉻ（补合）'
        }, {
          value: 'ergu',
          label: 'ꃱꈻ（俄古）'
        }, {
          value: 'asun',
          label: 'ꀉꌜ（阿孙）'
        }, {
          value: 'murejiba',
          label: 'ꐞꁠ（木惹吉巴）'
        }, {
          value: 'ageng',
          label: 'ꀊꈾ（阿耿）'
        }, {
          value: 'biji',
          label: 'ꁖꐚ（毕吉）'
        }, {
          value: 'dishama',
          label: 'ꄸꎭꂵ（底沙马）'
        }, {
          value: 'yizi',
          label: 'ꒉꌅ（依兹）'
        }, {
          value: 'abo',
          label: 'ꀋꁈ（阿波）'
        }, {
          value: 'shamaqvbi',
          label: 'ꂵꐎꀘ（沙马曲比）'
        }, {
          value: 'jize',
          label: 'ꐞꊒ（吉则）'
        }, {
          value: 'gebu',
          label: 'ꈾꁮ（格布）'
        }, {
          value: 'jijue',
          label: 'ꐞꏪ（吉觉）'
        }, {
          value: 'jimu',
          label: 'ꐚꃅ（吉木）'
        }, {
          value: 'ayue',
          label: 'ꀋꒀ（阿约）'
        }, {
          value: 'jile',
          label: 'ꐛꆪ（吉勒）'
        }, {
          value: 'ershi',
          label: 'ꀑꏂ（俄史）'
        }, {
          value: 'aeali',
          label: 'ꀊꇐꀋꅪ（阿尔阿里）'
        }, {
          value: 'mahai',
          label: 'ꂵꉌ（马海）'
        }, {
          value: 'nihe',
          label: 'ꅪꉘ（尼合）'
        }, {
          value: 'ale',
          label: 'ꀋꆺ（阿勒）'
        }, {
          value: 'jisi',
          label: 'ꐚꏂ（吉史）'
        }, {
          value: 'jisha',
          label: 'ꐞꌒ（吉沙）'
        }, {
          value: 'Jiba',
          label: 'ꐞꁠ（吉巴）'
        }, {
          value: 'jier',
          label: 'ꐛꊈ（吉俄）'
        }, {
          value: 'ani',
          label: 'ꀋꆀ（阿尼）'
        }, {
          value: 'wazha',
          label: 'ꃪꍈ（瓦渣）'
        }, {
          value: 'hailai',
          label: 'ꉊꆽ（海来）'
        }, {
          value: 'lama',
          label: 'ꇁꂷ（拉玛）'
        }, {
          value: 'jibo',
          label: 'ꐞꁁ（吉潘）'
        }, {
          value: 'yueme',
          label: 'ꒀꂿ（岳莫）'
        }, {
          value: 'jihuo',
          label: 'ꐞꉷ（吉伙）'
        }, {
          value: 'jiba',
          label: 'ꐞꈬ（吉巴）'
        }, {
          value: 'ake',
          label: 'ꀋꈆ（阿柯）'
        }, {
          value: 'yueze',
          label: 'ꑺꋕ（约则）'
        }, {
          value: 'jili',
          label: 'ꐚꅪ（吉里）'
        }, {
          value: 'ashuo',
          label: 'ꀈꎵ（阿说）'
        }, {
          value: 'debu',
          label: 'ꅉꀮ（德布）'
        }, {
          value: 'niguo',
          label: 'ꆀꈢ（尼果）'
        }, {
          value: 'jizi',
          label: 'ꐛꋩ（吉子）'
        }, {
          value: 'buze',
          label: 'ꁮꎓ（布止）'
        }, {
          value: 'nima',
          label: 'ꑍꂷ（尼马）'
        }]
      }],
      ruleForm: {
        name: '',
        cipher: '',
        phone: '',
        email: '',
        date1: '',
        value: '',
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 0, max: 20, message: '长度为11位', trigger: 'blur' }
        ],
        cipher: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 100000, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhoneNumber, trigger: 'blur' },
          { min: 11, max: 11, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写验证码', trigger: 'blur' },
          { min: 0, max: 1000000, trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, validator: dateCheck, message: '请选择日期', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请选择家族', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // zhang 上传头像
    onProgress (event, file, fileList) {
      // this.num = Math.floor(event.percent)
    },
    handleAvatarSuccess (resd, file, fileList) {
      this.loadingHeadImg = false
    },
    beforeAvatarUpload (file) {
      let _this = this
      console.log(file)
      const isJPG = file.type === ('image/jpeg' || 'image/png' || 'image/bmp')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        _this.$message.error('上传头像图片只能是 JPG/PNG格式!')
      }
      if (!isLt2M) {
        _this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M && file) {
        _this.imgFile = file
        _this.loadingHeadImg = true
        let df = new FormData()
        df.append('file', file)
        df.append('token', _this.upToken)
        console.log(df)
        console.log(df.get('file'))
        axios({
          url: _this.urls.qiNiuYun,
          method: 'post',
          data: df,
          onUploadProgress (progressEvent) {
            if (progressEvent.lengthComputable) {
              let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
              _this.num = parseInt(val)
            }
          }
        })
          .then(res => {
            console.log(res)
            let hash = res.data.hash
            let domain = _this.domain + '/'
            _this.imageUrl = domain + hash
            _this.loadingHeadImg = false
          })
          .catch(err => {
            console.log(err)
            _this.loadingHeadImg = false
          })
      }
      return isJPG && isLt2M
    },
    /**
     * hanleRemove和handlePictureCardPreview函数是负责控制头像部分从本地上传照片
     */
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    /**
     *获取验证码
     */
    getEmail () {
      axios({
        url: 'http://175.24.83.13:8000/sendSmsCode',
        method: 'post',
        params: {
          'userPhone': this.ruleForm.phone
        }
      })
        .then(this.getEmailCode)
    },
    submitForm (ruleForm) {
      /**
       * 这个是判断输入内容的格式是否符合标准
       */
      let _this = this
      let imgName = _this.imgFile.name
      let imgFile = _this.imgFile
      console.log(_this.$refs.ruleForm.validate)
      _this.$refs.ruleForm.validate((valid) => {
        console.log(valid && imgFile)
        console.log('saddwdq')
        if (valid && imgFile) {
          console.log('456')
          let observer = {
            next (res) {
            },
            error (err) {
              console.log(err)
            },
            complete (res) {
              console.log('789')
              let hash = res.hash
              let imgFileUrl = _this.domain + '/' + hash
              let formData = {}
              formData.username = _this.ruleForm.name
              formData.family = _this.ruleForm.value
              formData.password = _this.ruleForm.cipher
              formData.userPhone = _this.ruleForm.phone
              formData.smsCode = _this.ruleForm.email
              formData.userBirth = _this.date
              formData.userSex = _this.ruleForm.resource
              formData.userImg = imgFileUrl
              // f.append('userName', _this.ruleForm.name)
              // f.append('family', _this.ruleForm.value)
              // f.append('password', _this.ruleForm.cipher)
              // f.append('userPhone', _this.ruleForm.phone)
              // f.append('smsCode', _this.ruleForm.email)
              // f.append('userBirth', _this.date)
              // f.append('userSex', _this.ruleForm.resource)
              // f.append('userImg', imgFileUrl)
              console.log(formData)
              axios({
                url: 'http://175.24.83.13:8000/doRegister',
                method: 'get',
                params: formData
              })
                .then(_this.getHomeInfoSucc)
            }
          }
          let observable = qiniu.upload(imgFile, imgName, _this.upToken, _this.putExtra, _this.config)
          observable.subscribe(observer)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 1) {
        alert('注册成功')
        console.log(res.msg)
      } else if (res.code === 50004 || 20004) {
        alert(res.msg)
      }
    },
    getEmailCode (res) {
      res = res.data
      if (res.code === 1) {
        res = res.data
        console.log(res) /** 这里可以加else if函数来判断改号码获取验证码是否成功 */
      }
    },
    /**
     * 重置函数
     */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    axios.create({
      withCredentials: false
    })
    this.tokenHeader = {'Authorization': 'Bearer ' + localStorage.getItem('Authorization')}
    axios({
      method: 'post',
      url: this.urls.getUpToken,
      headers: {
        'Authorization': this.tokenHeader
      }
    }).then(res => {
      this.upToken = res.data.upToken
      this.domain = res.data.domain
    })
  }
}
</script>
<style lang="scss" scoped>
.el-form-item__content{
    margin-left: 0px!important;
}
.bottom-re{
    width: 200px;
    margin: 50px auto;
}
.upload{
    width: 148px;
    margin: 20px auto;
}
.familyId{
  margin-left: 0;
  font-weight: 400
}
.avatar-uploader {
  width: 148px;
  height: 148px;
  margin: 20px auto;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  .ti{
    display: block;
    position: absolute;
    width: 148px;
    height: 30px;
    top: 150px;
    left: 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #999999;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  position: relative;
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
