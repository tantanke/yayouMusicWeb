import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import createCentre from '@/layout/createcentre.vue'
import Index from '@/page/index.vue'
import Movie from '@/page/movie.vue'
import Shop from '@/page/shop.vue'
import ChangeLanguage from '@/page/changeLanguage.vue'
import Singer from '@/page/singer.vue'
import MyMusic from '@/page/mymusic.vue'
import musicPlayer from '@/layout/musicplayer.vue'
import Mysetting from '@/components/selectionarea/mysetting.vue'
// 一级路由直接加载 之后的子路由全部使用懒加载
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'defaultPage',
    redirect: '/index',
    component: defaultPage,
    children: [{
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/movie',
      name: 'movie',
      component: Movie,
      redirect: '/movie/movieList',
      children: [{
        path: '/movie/movieList',
        name: 'movieList',
        component: () => import('@/components/movie/movieList.vue'),
        /* beforeEnter (to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 `this`
          // 因为当守卫执行前，组件实例还没被创建
          console.log(111)
          next()
        } */
        children: [{
          path: '/movie/movieList/:movieid',
          name: 'movieListItem',
          component: () => import('@/components/movie/movieitem/index.vue')
        }]
      }]
    }, {
      path: '/shop',
      name: 'shop',
      component: Shop
    }, {
      path: '/songlistdetail/:songlistid',
      name: 'songlistdetail',
      component: () => import('@/components/detailpage/songlistdetail.vue')
    }, {
      path: '/songlistdetail/songdetail/:songid',
      name: 'songdetail', // 测试用的之后要重新更改路由
      component: () => import('@/components/mymusic/songdetail.vue')
    }, {
      path: '/registermusician',
      name: 'registermusician', // 注册音乐人路由
      component: () => import('@/components/header/registermusician.vue')
    }, {
      path: '/setting',
      name: 'setting',
      redirect: '/setting/default',
      component: Mysetting,
      children: [{
        path: '/setting/default',
        name: 'resetdefault',
        component: () => import('@/components/selectionarea/mysetting/default.vue')
      }, {
        path: '/setting/check',
        name: 'resetcheck',
        component: () => import('@/components/selectionarea/mysetting/check.vue')
      }, {
        path: '/setting/resetphone',
        name: 'resetphone',
        component: () => import('@/components/selectionarea/mysetting/resetphone.vue')
      }, {
        path: '/setting/resetpassword',
        name: 'resetpassword',
        component: () => import('@/components/selectionarea/mysetting/resetpassword.vue')
      }, {
        path: '/setting/resetheadimg',
        name: 'resetheadimg',
        component: () => import('@/components/selectionarea/mysetting/resetheadimg.vue')
      }]
    }, {
      path: '/changelanguage',
      name: 'changeLanguage',
      component: ChangeLanguage
    }, {
      path: '/mymusic',
      name: 'myMusic',
      component: MyMusic,
      redirect: '/mymusic/personalcenter',
      children: [{
        path: '/mymusic/personalcenter',
        name: 'personalCenter',
        redirect: '/mymusic/personalcenter/ilike',
        component: () => import('@/components/mymusic/personalcenter.vue'),
        children: [{
          path: '/mymusic/personalcenter/ilike',
          name: 'iLike',
          redirect: '/mymusic/personalcenter/ilike/song',
          component: () => import('@/components/mymusic/mycategory/ilike.vue'),
          children: [{
            path: '/mymusic/personalcenter/ilike/song',
            name: 'iLikeSong',
            component: () => import('@/components/mymusic/mycategory/ilikes/song.vue')
          }, {
            path: '/mymusic/personalcenter/ilike/songlist',
            name: 'iLikeSongList',
            component: () => import('@/components/mymusic/mycategory/ilikes/songlist.vue')
          }, {
            path: '/mymusic/personalcenter/ilike/spcialed',
            name: 'iLikeSEd',
            component: () => import('@/components/mymusic/mycategory/ilikes/spcialed.vue')
          }, {
            path: '/mymusic/personalcenter/ilike/video',
            name: 'iLikeVideo',
            component: () => import('@/components/mymusic/mycategory/ilikes/video.vue')
          }]
        }, {
          path: '/mymusic/personalcenter/songhascreated',
          name: 'songHasCreated',
          component: () => import('@/components/mymusic/mycategory/songhascreated.vue')
        }, {
          path: '/mymusic/personalcenter/focus',
          name: 'iFocus',
          component: () => import('@/components/mymusic/mycategory/focus.vue')
        }, {
          path: '/mymusic/personalcenter/fans',
          name: 'iFans',
          component: () => import('@/components/mymusic/mycategory/fans.vue')
        }, {
          path: '/mymusic/personalcenter/videohasdone',
          name: 'iHasVideo',
          component: () => import('@/components/mymusic/mycategory/videohasdone.vue')
        }]
      }, {
        path: '/mymusic/singer/:singerid',
        name: 'likesinger',
        component: () => import('@/components/mymusic/singer.vue')
      }]
    }, {
      path: '/singer',
      name: 'singer',
      component: Singer,
      redirect: '/singer/singerList',
      children: [{
        path: '/singer/singerList',
        name: 'singerList',
        component: () => import('@/components/singer/singerrecommend.vue')
      }, {
        path: '/singer/musiccate',
        name: 'musiccate',
        component: () => import('@/components/singer/musiccate.vue')
      }]
    }]
  }, {
    path: '/createcentre',
    name: 'createCentre',
    redirect: '/createcentre/firstpage',
    component: createCentre,
    children: [{
      path: '/createcentre/dutycentre',
      name: 'dutycentre',
      component: () => import('@/components/createcentre/main/dutycentre.vue')
    }, {
      path: '/createcentre/fanscentre',
      name: 'fanscentre',
      component: () => import('@/components/createcentre/main/fanscentre.vue')
    }, {
      path: '/createcentre/createablum',
      name: 'createablum',
      component: () => import('@/components/createcentre/main/createablum.vue'),
      beforeEnter: (to, from, next) => { // 限制该路由的进入
        if (from.meta.fromhand) {
          if (from.meta.isNormol) {
            to.meta.isNormol = true
          } else {
            to.meta.isNormol = false
          }
          next()
        } else {
          next('/createcentre/handinprodution')
        }
      },
      meta: {isNormol: false}
    }, {
      path: '/createcentre/handinprodution',
      name: 'handinprodution',
      component: () => import('@/components/createcentre/main/handinprodution.vue'),
      meta: { isNormol: true,
        fromhand: true}
    }, {
      path: '/createcentre/mymoney',
      name: 'mymoney',
      component: () => import('@/components/createcentre/main/mymoney.vue')
    }, {
      path: '/createcentre/remark',
      name: 'remark',
      component: () => import('@/components/createcentre/main/remark.vue')
    }, {
      path: '/createcentre/songnum',
      name: 'createsongnum',
      component: () => import('@/components/createcentre/main/songnum.vue')
    }, {
      path: '/createcentre/personalinfor',
      name: 'personalinfor',
      component: () => import('@/components/createcentre/header/personalinfor.vue')
    }, {
      path: '/createcentre/resetmusician',
      name: 'resetmusician', // 修改音乐人信息路由
      component: () => import('@/components/createcentre/header/resetmusician.vue')
    }, {
      path: '/createcentre/managemusic',
      name: 'managemusic',
      component: () => import('@/components/createcentre/main/managemusic.vue')
    }]
  },
  {
    /* path: '/musicplayer/:songId', */ // 动态路由歌曲id
    path: '/musicplayer',
    name: 'musicplayer',
    component: musicPlayer
  }]
})
