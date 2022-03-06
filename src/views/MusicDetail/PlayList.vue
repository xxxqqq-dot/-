<template>
  <div class="playList">
    <SongList/>
  </div>
</template>

<script>
import SongList from '../../components/MusicDetail/SongList.vue'
import {mapState} from 'vuex'
import {mixin} from '../../plugins/mixin'
export default {
  name: 'PlayList',
  data(){
    return {

    }
  },
  components: {
    SongList
  }
}
</script>

<style lang="less" scoped>
  
</style>