import Vuex, { Store } from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const actions = {
  saveCollectSongList(context,value){
    console.log(context.state.collectSongList)
    context.commit('CHECK_IS_SAME', [context.state.collectSongList, value, true])
  },
  saveCurrentPlayIndex(context, value){
    context.state.currentPlayList = context.state.currentPlayList.map(item => {
      item.isCurrentPlay = false
      return item
    }) 
    context.state.playlist = context.state.playlist.map(item => {
      item.isCurrentPlay = false
      return item
    }) 
    context.state.playlist.splice(1,0)
    context.state.currentPlayList.splice(1,0)
    let currentPlay = JSON.parse(JSON.stringify(value[1]))
    currentPlay.dt = new Date().getFullYear()+ '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    context.commit('CHECK_IS_SAME', [context.state.recentlyPlayList, currentPlay, false])
    // console.log('ppp',value)
    if(value[0] == -1) return
    context.state.currentPlayList[value[0]].isCurrentPlay = true
  },
  saveLikeMusic(context, value){
    // context.state.likeMusic
    context.commit('CHECK_IS_SAME', [context.state.likeMusic,value, true])
    localStorage.setItem('likemusic', JSON.stringify(context.state.likeMusic))
  }
}
const mutations = {
  SAVELIKId(state,value){
    if(state.likeId.indexOf(value) !== -1){
      state.likeId.splice(state.likeId.indexOf(value), 1)
    } else { 
      state.likeId.unshift(value) 
    }
    localStorage.setItem('likeid', JSON.stringify(state.likeId))
  },
  SHOWISLIKE(state){
    state.playlist = state.playlist.map(item => {
      if(state.likeId.indexOf(item.id) !== -1){
        item.islike = true
      } else {
        item.islike = false
      }
      return item
    })
  },
  SAVE_DETAIL_INFO(state, value){
    state.detailInfo = value
    window.localStorage.setItem('detailInfo',JSON.stringify(value))
  },
  SAVE_PLAY_LIST(state, value){
    state.playlist = value
    state.playlist = state.playlist.map(item => {
      if(state.likeId.indexOf(item.id) !== -1){
        item.islike = true
      } else {
        item.islike = false
      }
      item.isCurrentPlay = false
      return item
    })
    // window.localStorage.setItem('playlist', JSON.stringify(value))
    state.playlist.splice(1,0)
  },
  CHANGE_MUSIC_PLAY(state, value){
    state.isMusicPlay = value
  },
  SAVE_CURRENT_PLAY_LIST(state, value){
    window.localStorage.setItem('currentPlayList', JSON.stringify(value))
    state.currentPlayList = value
  },
  // SAVE_CURRENT_PLAY_INDEX(state, value){
  //   state.currentPlayList.map(item => {
  //     item.isCurrentPlay = false
  //   }) 
  //   state.playlist.map(item => {
  //     item.isCurrentPlay = false
  //   }) 
  //   state.playlist.splice(1,0)
  //   state.currentPlayList.splice(1,0)
  //   state.currentPlayList[value].isCurrentPlay = true
  //   let currentPlay = JSON.parse(JSON.stringify(state.currentPlayList[value]))
  //   currentPlay.dt = new Date().getFullYear()+ '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  //   state.recentlyPlayList.unshift(currentPlay)
  //   state.playlist[value].isCurrentPlay = true
  // },
  SAVE_CURRENT_INDEX(state, value){
    state.currentIndex = value
  },
  CHANGE_COMPONENT_STATE(state){
    state.showComponent = !state.showComponent
  },
  CHECK_IS_SAME(state, value){
    let currentindex = 0
    let isExist = value[0].some((item,index) => {
      if(item.id == value[1].id){
        currentindex = index
      }
      return item.id == value[1].id
    })
    if(isExist){
      value[0].splice(currentindex,1)
      if(value[2]) return
    }
    value[0].unshift(value[1])
  }
}
const state = {
  userInfo: '',
  // playlist: localStorage.getItem('playlist')?JSON.parse(localStorage.getItem('playlist')):'',
  playlist: [],
  likeMusic: localStorage.getItem('likemusic')?JSON.parse(localStorage.getItem('likemusic')):[],
  likeId: localStorage.getItem('likeid')?JSON.parse(localStorage.getItem('likeid')):[],
  detailInfo: localStorage.getItem('detailInfo')?JSON.parse(localStorage.getItem('detailInfo')):'',
  isMusicPlay: false,
  currentPlayList: window.localStorage.getItem('currentPlayList')?JSON.parse(window.localStorage.getItem('currentPlayList')):[],
  currentIndex: 10,
  showComponent: true,
  collectSongList: window.localStorage.getItem('collectSongList')?JSON.parse(window.localStorage.getItem('collectSongList')):[],
  recentlyPlayList: []
}
const getters = {
  
}
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})