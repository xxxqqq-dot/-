export const mixin = {
  methods: {
    playMusic(musicInfo,playlist){
      this.$store.commit('CHANGE_MUSIC_PLAY', true)
      if(playlist){
        this.$store.commit('SAVE_CURRENT_PLAY_LIST', playlist)
      }
      this.$bus.$emit('play',musicInfo)
    },
    detailMusicList(type,id){
      this.$router.push({
        path: '/Home/MusicDetail',
        query: {
          type,
          detailInfoId: id
        }
      })
    },
    toSingerDetail(info){
      this.$router.push({
        path: '/Home/SingerDetail',
        query: {
          singerDetailInfo: JSON.stringify(info)
        }
      })
    },
    isNeedSkip(){
      this.$store.commit('CHANGE_COMPONENT_STATE')
      this.$nextTick(() => {
        this.$store.commit('CHANGE_COMPONENT_STATE')
      })
    },
    changeActiveIndex(index){
      this.activeIndex = index
    }
  }
}