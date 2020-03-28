<template>
  <div>
      <input type="file" ref="fileInt" @change="changeHandle">
  </div>
</template>

<script>
export default {
  methods: {
    changeHandle () {
      const file = this.$refs.fileInt.files[0]
      let upVideoForm = new FormData()
      upVideoForm.append('coverImage', file)
      upVideoForm.append('coverImage', file)
      console.log(upVideoForm.get('coverImage'))
      this.$axios({
        method: 'post',
        url: 'http://yayoutes.utools.club/singer/subMv',
        // 这里的页码默认为一 singerId在路由中拿到
        data: upVideoForm,
        processData: false
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    let _this = this
    _this.$axios.defaults.baseURL = 'http://yayoutes.utools.club'
    _this.$axios.create({
      withCredentials: true
    })
    _this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
}
</script>

<style>

</style>
