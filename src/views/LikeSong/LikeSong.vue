<template>
  <div class="likeSongContainer">
    <h1 class="likeSongTitle">我喜欢的音乐</h1>
    <SongList :playlist="likeMusic"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SongList from '../../components/MusicDetail/SongList'
export default {
  name: 'LikeSong',
  components: {
    SongList
  },
  computed: {
    ...mapState(['playlist', 'likeMusic'])
  },
  mounted(){
    // console.log(this.likeMusic)
    this.$store.commit('SAVE_PLAY_LIST', this.likeMusic)
  },
  updated(){
    console.log(this.likeMusic)
    this.$store.commit('SAVE_PLAY_LIST', this.likeMusic)
  }
}
</script>

<style lang="less" scoped>
  .likeSongContainer{
    .likeSongTitle{
      margin: 10px 0;
      font-size: 20px;
    }
  }
</style>