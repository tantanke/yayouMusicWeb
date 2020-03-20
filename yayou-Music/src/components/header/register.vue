<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item prop="name">
            <el-input placeholder="用户名" v-model="ruleForm.name">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="电话号码" v-model="ruleForm.phone">
              <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="cipher">
            <el-input placeholder="密码" v-model="ruleForm.cipher">
                <template slot="prepend" ><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item label="家族" class="familyId" prop="value">
          <el-select v-model="ruleForm.value" clearable placeholder="请选择" class="familyidBox">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item prop="email">
            <el-input placeholder="验证码" v-model="ruleForm.email">
                <template slot="append"><el-button @click="getEmail(), ajust()">发送验证码</el-button></template>
            </el-input>
        </el-form-item>
        <el-form-item label="出生日期" required class="birthday">
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="resource" class="sex">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="bottom-re">
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var checkPhoneNumber = (rule, value, callback) => {
      console.log('外面')
      axios({
        url: 'http://175.24.83.13:8000/findUserExist',
        method: 'post',
        params: {
          'userPhone': this.phone
        }
      })
        .then(function (res) {
          res = res.data
          if (res.code === 1) {
            return callback(new Error('该电话号码已经注册'))
          }
        })
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('请输入正确的电话号码'))
      }
    }
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dataCode: String,
      /** options里面是家族的值 */
      options: [{
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
          { min: 0, max: 1000000, message: '长度为11位', trigger: 'blur' }
        ],
        cipher: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 100000, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhoneNumber, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写验证码', trigger: 'blur' },
          { min: 0, max: 1000000, trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
    /**
     * hanleRemove和handlePictureCardPreview函数是负责控制头像部分从本地上传照片
     */
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     *获取验证码
     */
    getEmail () {
      axios({
        url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/sendSmsCode',
        method: 'post',
        params: {
          'userPhone': this.phone
        }
      })
        .then(this.getEmailCode)
    },
    submitForm (formName) {
      /**
       * 这个是判断输入内容的格式是否符合标准
       */
      this.$refs[formName].validate((valid) => {
        if (valid && this.ajustCode === 0) {
          axios({
            url: 'http://47.104.101.193:80/eolinker_os/Mock/simple?projectID=1&uri=/doRegister',
            method: 'post',
            params: {
              'userName': this.name,
              'familyId': this.value,
              'password': this.cipher,
              'userPhone': this.phone,
              'smsCode': this.email,
              'userBirth': this.data1,
              'userSex': this.resource
            }
          })
            .then(this.getHomeInfoSucc)
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
  }
}
</script>
<style>
.el-form-item__content{
    margin-left: 0px!important;
}
.bottom-re{
    margin-left: 80px;
}
.el-upload{
    margin-left: 182px;
    margin-bottom: 20px;
}
.familyId{
  position: relative;
  margin-left: -50px;
  font-weight: 400
}
.familyidBox{
  display: inline-block;
  width: 460px;
}
</style>
