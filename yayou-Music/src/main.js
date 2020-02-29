// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import '@/assets/styles/iconfont.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import axios from 'axios'
import Vuex from 'vuex'
process.env.Mock && require('./mock/mock.js')

Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.prototype.$video = Video
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
