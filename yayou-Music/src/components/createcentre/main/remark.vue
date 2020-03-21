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
      upVideoForm.append('coverImg', file)
      console.log(upVideoForm.get('coverImg'))
      this.$axios({
        method: 'put',
        url: '/setCover',
        data: upVideoForm
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    /* let _this = this */
    this.$axios.defaults.baseURL = 'http://175.24.83.13:8080'
    /* _this.$axios.interceptors.request.use(
      config => {
        if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    ) */
  }
}
</script>

<style>

</style>
