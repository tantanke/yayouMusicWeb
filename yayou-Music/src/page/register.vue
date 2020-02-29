<template>
  <div class="register-area">
    <router-link tag="div" :to="{name:'index'}" class="back"><i class="el-icon-s-custom"></i>&nbsp;返回</router-link>
    <form action="" method="post" target="" name="" class="register-from">
      <label for="username">账号：</label><input type="text" name="username" id="username" v-model="formData.username" placeholder="zhang"><br/>
      <label for="familyId">家族ID：</label><input type="text" name="familyId" id="familyId" v-model="formData.familyId" placeholder="zhang"><br/>
      <label for="password">密码：</label><input type="password" name="password" id="password" v-model="formData.password" maxlength="12" title="用户密码，6-12位，不能是纯数字" placeholder="zhang"><br/>
      <label for="phone">电话：</label><input type="text" name="phone" id="phone"  v-model="formData.phone" @change='phonechange' title="用户密码，6-12位，不能是纯数字" placeholder="zhang"><br/>
      <label for="birthday">生日：</label><input type="text" name="birthday" v-model='formData.birthday' id="birthday" title="用户密码，6-12位，不能是纯数字"><br/>
      <div class="headerimg-area">
       <div class="uploader">
        <div class="uploader-container" :style="{background: 'url(' + pictureUrl + ')'}">
        <i class="el-icon-plus" :class="showIcon? 'show': 'hide'"></i>
        </div>
        <input type="file" class="uploader-action" :model="pictureUrl" @change="fileChange" name="header-img" id="header-img"/>
       </div>
       <label for="header-img">上传头像</label>
      </div>
      <span class="sex">性别：</span>
      <label for="man" class="man-l">男</label><input type="radio" name="man" id="man">
      <label for="woman" class="woman-l">女</label><input type="radio" name="man" id="woman">
    <div class="input-div" v-show="formData.phone">
     <input type="text" class="input code" maxlength="6" name="code" v-model.trim="formData.code" placeholder="验证码">
     <button @click="getCode(formData)" class="code-btn" :disabled="!show">
         <span v-show="show">获取验证码</span>
         <span v-show="!show" class="count">{{count}}s 重新发送</span>
     </button>
     </div>
      <input type="submit" value="注册" @click="Submit(formData)">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
let axiosProxyFiles = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data'
  },
  // 具体的header内容是啥，取决于后台
  withCredentials: true // 开启cache模式
})
const TIME_COUNT = 60
export default {
  name: 'Register',
  props: {
    default: '', // 默认显示的图片
    index: '' // 如果一个页面里用到了多个图片上传组件，这个参数用来区别他们
  },
  data () {
    return {
      formData: {
        username: '',
        familyId: '',
        password: '',
        phone: '',
        birthday: '',
        sex: '',
        code: ''
      },
      show: true,
      count: '',
      timer: null,
      pictureUrl: '', // 用来预览的图片路径
      showIcon: true, // 有图片的时候显示图片，没图片的时候显示成一个加号
      picturePath: '' // 传给接口的那个图片路径
    }
  },
  methods: {
    phonechange () {
      this.formData.phone = this.formData.phone
    },
    Submit (formData) {
      axios.post('', JSON.stringify(formData))
        .then(res => {
          if (res.data.errorCode === '0') {
            this.successMessage('文件上传成功')
          } else {
            if (res.data.errorMessage) {
              this.errorMessage(res.data.errorMessage)
            } else {
              this.errorMessage('文件上传失败')
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fileChange (e) {
      let file = e.target.files[0]
      // let filename = e.currentTarget.files[0]
      var formData = new FormData()
      formData.append('file', file)

      // 如果资源传到自己的服务器上，需要以上四行代码，转换一下文件格式，如果直接上传文件到cdn，则不需要
      let url = 'http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/doRegister'
      axiosProxyFiles.post(url, formData)
        .then(res => {
          if (res.data.errorCode === '0') {
            this.successMessage('文件上传成功')
            this.pictureUrl = res.data.data.url
            this.picturePath = res.data.data.path
            this.showIcon = false
            if (this.index) {
              this.$emit('change', this.pictureUrl, this.index, this.picturePath)
            } else {
              this.$emit('change', this.pictureUrl)
            }
          } else {
            if (res.data.errorMessage) {
              this.errorMessage(res.data.errorMessage)
            } else {
              this.errorMessage('文件上传失败')
            }
          }
        })
        .catch(err => { console.log(err) })
    },
    getCode (formData) {
      axios.post('http://47.104.101.193:80/eolinker_os/Mock/mock?projectID=1&uri=/sendSmsCode', formData.phone)
        .then(res => {
          if (res.data.errorCode === '0') {
            this.successMessage('文件上传成功')
          } else {
            if (res.data.errorMessage) {
              this.errorMessage(res.data.errorMessage)
            } else {
              this.errorMessage('文件上传失败')
            }
          }
        })
        .catch(err => { console.log(err) })
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  },
  mounted () {
    if (this.default !== undefined) {
      if (this.default === '') {
        this.showIcon = true
      } else {
        this.showIcon = false
      }
      this.pictureUrl = this.default
    } else {
      this.showIcon = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/register/register.scss';
</style>
