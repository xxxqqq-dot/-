<template>
  <div class="albumContainer">
    <img src="../../assets/images/top.png" alt="">
    <div class="hotAlbum">
      <div class="title">
        <h1>热门50首</h1>
        <span class="iconfont icon-bofangqi-bofangshu"></span>
        <div class="line">|</div>
        <span class="iconfont icon-folder-add"></span>
      </div>
      <SongList/>
      <div v-show="isShowLookAll&&hotAlbum.length >= 10" class="lookAll" @click="lookAll"><span>查看全部{{hotAlbum.length}}首   ></span></div>
    </div>
  </div>
</template>

<script>
import SongList from '../../components/MusicDetail/SongList.vue'
export default {
  name: 'Album',
  data(){
    return {
      hotAlbum: [],
      someHotAlbum: [],
      isShowLookAll: true
    }
  },
  props: ['singerId'],
  components: {
    SongList
  },
  methods: {
    async getHotAlbum(){
      const {data} = await this.$request('/artist/top/song', {
        params: {
          id: JSON.parse(this.$route.query.singerDetailInfo).id
        }
      })
      console.log('12weq',data)
      this.hotAlbum = data.songs
      this.someHotAlbum = data.songs.slice(0,10)
      this.$store.commit('SAVE_PLAY_LIST',this.someHotAlbum)
    },
    lookAll(){
      this.isShowLookAll = !this.isShowLookAll
      this.$store.commit('SAVE_PLAY_LIST',this.hotAlbum)
    }
  },
  mounted(){
    console.log('oiujk',this.singerId)
    this.getHotAlbum()
  }
}
</script>

<style lang="less" scoped>
  .albumContainer{
    display: flex;
    flex: 1;
    margin-top: 15px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 10px;
      margin-right: 50px;
    }
    .hotAlbum{
      .title{
        display: flex;
        align-items: center;
        h1{
          margin-right: 20px;
        }
        span{
          font-size: 20px;
          color: #666666;
        }
        .line{
          margin: 0 10px;
          color: #e6e6e6;
          font-size: 12px;
        }
      }
      .lookAll{
        cursor: pointer;
        background-color: #f9f9f9;
        height: 48px;
        // padding: 12px 0;
        color: #9b9b9b;
        font-size: 12px;
        line-height: 48px;
        span{
          float: right;
          margin-right: 20px;
        }
      }
    }
  }
</style>