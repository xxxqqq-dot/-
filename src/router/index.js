import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    component: () => import('../views/Home'),
    redirect: '/Home/FindMusic',
    children: [
      {
        path: 'FindMusic',
        component: () => import('../views/FindMusic/FindMusic'),
        redirect: '/Home/FindMusic/PersonRecommend',
        children: [
          {
            path: 'PersonRecommend',
            component: () => import('../views/FindMusic/PersonRecommend')
          },
          {
            path: 'PersonSongList',
            name: 'PersonSongList',
            component: () => import('../views/FindMusic/PersonSongList/PersonSongList')
          },
          {
            path: 'TopList',
            component: () => import('../views/FindMusic/TopList/TopList')
          },
          {
            path: 'Singer',
            component: () => import('../views/FindMusic/Singer/Singer')
          },
          {
            path: 'NewMusic',
            component: () => import('../views/FindMusic/NewMusic/NewMusic'),
            redirect: '/Home/FindMusic/NewMusic/NewMusicList',
            children: [
              {
                path: 'NewMusicList',
                component: () => import('../views/FindMusic/NewMusic/NewMusicList')
              },
              {
                path: 'NewDiscList',
                component: () => import('../views/FindMusic/NewMusic/NewDiscList')
              }
            ]
          }
        ]
      },
      {
        path: 'Video',
        redirect: '/Home/Video/RelevantVideo',
        component: () => import('../views/Video/Video'),
        children: [
          {
            path: 'RevelantMV',
            component: () => import('../views/Video/RevelantMV')
          },
          {
            path: 'RelevantVideo',
            component: () => import('../views/Video/RelevantVideo')
          }
        ]
      },
      { 
        name: 'MusicDetail',
        path: 'MusicDetail',
        component: () => import('../views/MusicDetail/MusicDetail'),
        // redirect: '/Home/MusicDetail/PlayList',
        children: [
          {
            
            path: 'PlayList',
            component: () => import('../views/MusicDetail/PlayList')
          },
          {
            path: 'MusicListComment',
            component: () => import('../views/MusicDetail/MusicListComment')
          }
        ]
      },
      {
        path: 'SingerDetail',
        component: () => import('../views/SingerDetail/SingerDetail'),
      },
      {
        path: 'VideoDetail',
        component: () => import('../views/VideoDetail/VideoDetail')
      },
      {
        path: 'MVDetail',
        component: () => import('../views/VideoDetail/MVDetail')
      },
      {
        path: 'AllMV',
        component: () => import('../views/Video/AllMV')
      },
      {
        path: 'RecentlyPlay',
        component: () => import('../views/RecentlyPlay/RecentlyPlay')
      },
      {
        path: 'LikeSong',
        component: () => import('../views/LikeSong/LikeSong')
      }
    ]
  },
  {
    path: '/Login',
    component: () => import('../views/Login/Login')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach( (to,from,next) => {
//   if(to.path.indexOf('/MusicDetail')){
//     from.query.detailInfo = to.query.detailInfo
//     router.push({
//       path: to.path,
//       query: {
//         detailInfo: JSON.parse(from.query.detailInfo)
//       }
//     })
//   }
//   next()
// })
export default router
