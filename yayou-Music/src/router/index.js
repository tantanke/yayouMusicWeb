import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import createCentre from '@/layout/createcentre.vue'
import musicPlayer from '@/layout/musicplayer.vue'
import notFound from '@/layout/404notfound.vue'
import Find from '@/page/find.vue'
import Movie from '@/page/movie.vue'
import Shop from '@/page/shop.vue'
import Singer from '@/page/singer.vue'
import MyMusic from '@/page/mymusic.vue'
import member from '@/page/member.vue'
import search from '@/page/search.vue'
import Mysetting from '@/components/selectionarea/mysetting.vue'

// 一级路由直接加载 之后的子路由全部使用懒加载
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'defaultPage',
    redirect: '/find',
    component: defaultPage,
    children: [{
      path: '/find',
      name: 'find',
      component: Find
    }, {
      path: '/find/ranklist/ranklistDetail',
      name: 'ranklistdetail',
      component: () => import('@/components/main/ranklistDetail/index.vue')
    }, {
      path: '/find/songSheet/sheet',
      name: 'songSheet',
      component: () => import('@/components/main/songSheet/sheet.vue')
    }, {
      path: '/find/songSheet/allsong',
      name: 'allsong',
      component: () => import('@/components/main/songSheet/song.vue')
    }, {
      path: '/movie',
      name: 'movie',
      component: Movie,
      redirect: '/movie/allMovie/movieList',
      children: [{
        path: '/movie/allMovie',
        name: 'allMovie',
        redirect: '/movie/allMovie/movieList',
        component: () => import('@/components/movie/moviemiddle.vue'),
        /** 这个路由里面要添加videoid isvip的值，参考search里面的val传参 */
        children: [{
          path: '/movie/allMovie/movieList',
          name: 'movieList',
          component: () => import('@/components/movie/movieList.vue')
        }, {
          path: '/movie/allMovie/movieItem/:isvip/:movieid',
          name: 'movieListItem',
          component: () => import('@/components/movie/movieitem.vue'),
          beforeEnter: (to, from, next) => {
            // just use `this`
            if (localStorage.getItem('Authorization')) {
              if (to.params.isvip === 1 && localStorage.getItem('Role') === 'User') {
                alert('此为会员专区')
              } else {
                next()
              }
            } else {
              if (to.params.isvip === 1) {
                alert('请登录')
              } else {
                next()
              }
            }
          }
        }]
      }]
    }, {
      path: '/shop',
      name: 'shop',
      component: Shop
    }, {
      path: '/mymusic',
      name: 'myMusic',
      component: MyMusic,
      redirect: '/mymusic/personalcenter',
      beforeEnter: (to, from, next) => { // 限制该路由的进入
        if (localStorage.getItem('Authorization')) {
          next()
        } else {
          alert('请点击右上角登陆后查看！')
        }
      },
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
            redirect: '/mymusic/personalcenter/ilike/song/myplaylist',
            component: () => import('@/components/mymusic/mycategory/ilikes/song.vue'),
            children: [{
              path: '/mymusic/personalcenter/ilike/song/myplaylist',
              name: 'myplaylist',
              component: () => import('@/components/mymusic/mycategory/ilikes/songcontent/playlist.vue')
            }, {
              path: '/mymusic/personalcenter/ilike/song/mycollection',
              name: 'mycollection',
              component: () => import('@/components/mymusic/mycategory/ilikes/songcontent/collection.vue')
            }, {
              path: '/mymusic/personalcenter/ilike/song/myshare',
              name: 'myshare',
              component: () => import('@/components/mymusic/mycategory/ilikes/songcontent/share.vue')
            }, {
              path: '/mymusic/personalcenter/ilike/song/mycomment',
              name: 'mycomment',
              component: () => import('@/components/mymusic/mycategory/ilikes/songcontent/comment.vue')
            }, {
              path: '/mymusic/personalcenter/ilike/song/myloading',
              name: 'myloading',
              component: () => import('@/components/mymusic/mycategory/ilikes/songcontent/loading.vue')
            }]
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
      }]
    }, {
      path: '/singer',
      name: 'singer',
      component: Singer,
      redirect: 'singer/allSinger/singerList',
      children: [{
        path: '/singer/allSinger',
        name: 'allSinger',
        redirect: '/singer/allSinger/singerList',
        component: () => import('@/components/singer/singermiddle.vue'),
        children: [{
          path: '/singer/allSinger/singerList',
          name: 'singerList',
          component: () => import('@/components/singer/singerrecommend.vue')
        }, {
          path: '/singer/allSinger/singerDetail/:singerid',
          name: 'singerDetail',
          component: () => import('@/components/mymusic/singer.vue')
        }]
      }, {
        path: '/singer/musiccate',
        name: 'musiccate',
        component: () => import('@/components/singer/musiccate.vue')
      }]
    }, {
      path: '/member',
      name: 'member',
      component: member,
      children: [{
        path: '/member/memberself',
        name: 'memberself',
        component: () => import('@/components/member/memberself.vue')
      }, {
        path: '/member/membervipmoney',
        name: 'membervipmoney',
        component: () => import('@/components/member/membervipmoney.vue')
      }]
    }, {
      path: '/search/:val',
      name: 'search',
      component: search
    }, {
      path: '/musicplayer/:isvip/:songId', // 动态路由歌曲id
      // path: '/musicplayer',
      name: 'musicplayer',
      component: musicPlayer,
      beforeEnter: (to, from, next) => {
        // just use `this`
        if (localStorage.getItem('Authorization')) {
          if (to.params.isvip === 1 && localStorage.getItem('Role') === 'User') {
            alert('此为会员专区')
          } else {
            next()
          }
        } else {
          if (to.params.isvip === 1) {
            alert('此为会员专区，请登录后再尝试')
          } else {
            next()
          }
        }
      }
    }, {
      path: '/songlistdetail/:songlistid',
      name: 'songlistdetail',
      component: () => import('@/components/detailpage/songlistdetail.vue')
    }, {
      path: '/songdetail/:isvip/:songid',
      name: 'songdetail', // 测试用的之后要重新更改路由
      component: () => import('@/components/mymusic/songdetail.vue')
    }, {
      path: '/registermusician',
      name: 'registermusician',
      component: () => import('@/components/header/registermusician.vue')
    }, {
      path: '/setting',
      name: 'setting',
      redirect: '/setting/resetdefault',
      component: Mysetting,
      children: [{
        path: '/setting/resetdefault',
        name: 'resetdefault',
        component: () => import('@/components/selectionarea/mysetting/default.vue')
      }, {
        path: '/setting/resetcheck',
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
    }]
  }, {
    path: '/createcentre',
    name: 'createCentre',
    redirect: '/createcentre/handinprodution',
    component: createCentre,
    children: [{
      path: '/createcentre/resetmusician',
      name: 'resetmusician',
      component: () => import('@/components/createcentre/header/resetmusician.vue')
    }, {
      path: '/createcentre/dutycentre',
      name: 'dutycentre',
      component: () => import('@/components/createcentre/main/dutycentre.vue')
    }, {
      path: '/createcentre/fanscentre',
      name: 'fanscentre',
      component: () => import('@/components/createcentre/main/fanscentre.vue')
    }, {
      path: '/createcentre/createalbum',
      name: 'createalbum',
      component: () => import('@/components/createcentre/main/createalbum.vue'),
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
      path: '/createcentre/managemusic',
      name: 'managemusic',
      component: () => import('@/components/createcentre/main/managemusic.vue')
    }]
  }, {
    path: '*',
    name: 'notFound',
    component: notFound
  }]
})
