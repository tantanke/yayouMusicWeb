// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import '@/assets/styles/iconfont.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import axios from 'axios'
import VueResource from 'vue-resource'
import router from './router'
import Qs from 'qs'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
/** process.env.Mock && require('./mock/mock.js') */

Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.qs = Qs
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.prototype.$video = Video
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.prototype.$EventBus = new Vue()//  这是一个事件总线

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
