<template>
  <div class="newMusicListContainer">
    <NewMusicOption @getNewList="getNewList" :cateType="cateType">
      <div class="btns">
        <button class="playAll iconfont icon-bofangqi-bofangshu">播放全部</button>
        <button class="collectAll iconfont icon-folder-add">收藏全部</button>
      </div>
    </NewMusicOption>
    <SongList v-if="!loading" :playlist="newMusicList">
      <template v-slot:option>
        <div></div>
      </template>
      <template v-slot:title="{musicTitle}">
        <div class="img" @click="playMusic(musicTitle,newMusicList)" v-if="musicTitle.album">
          <img src="../../../assets/images/loading.jpeg" v-lazyLoading="musicTitle.album.blurPicUrl" alt="">
          <button class="play"><i class="iconfont icon-bofang"></i></button>
        </div>
      </template>
      <template v-slot:singerName="{songInfo}">
        <span v-if="songInfo.artists" @click="toSingerDetail(songInfo.artists[0])">{{songInfo.artists[0].name}}</span>
      </template>
      <template v-slot:album="{album:{album}}">
        <span @click="detailMusicList('album',album)">{{album.name}}</span>
      </template>
      <template v-slot:timer="{timer}">
        <span>{{timer.duration | detailTime}}</span>
      </template>
    </SongList>
    <div class="showLoading" v-else
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
    </div>
  </div>
</template>

<script>
import {mixin} from '../../../plugins/mixin'
import NewMusicOption from '../../../components/FindMusic/NewMusic/NewMusicOption.vue'
import SongList from '../../../components/MusicDetail/SongList'
export default {
  name: 'NewMsicList',
  data(){
    return {
      newMusicList: [],
      cateType: {
        '0': '全部',
        '7': '华语',
        '96': '欧美',
        '8': '日本',
        '16': '韩国'
      },
      loading: false
    }
  },
  components: {
    NewMusicOption,
    SongList
  },
  mixins: [mixin],
  methods: {
    async getNewList(type){
      this.loading = true
      const {data:res} = await this.$request('/top/song', {
        params: {
          type
        }
      })
      this.newMusicList = res.data
      window.localStorage.setItem('playlist', JSON.stringify(this.newMusicList))
      this.$store.commit('SAVE_PLAY_LIST',this.newMusicList)
      this.loading = false
    }
  },
  mounted(){
    this.getNewList('0')
  }
}
</script>

<style lang="less" scoped>
  .btns{
    button{
      width: 100px;
      height: 25px;
      line-height: 25px;
      border-radius: 15px;
      margin-right: 20px;
      font-size: 14px;
    }
    .playAll{
      background-color: #ec4141;
      color: #fff;
      border: 0;
    }
    .collectAll{
      border: 1px solid #e2e2e2;
      background-color: #fff;
    }
  }
  .img{
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 5px;
    cursor: pointer;
    img{
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
    .play{
      position: absolute;
      width: 25px;
      height: 25px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
      i{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 25px;
        color: #ec4141;
        font-size: 12px;
      }
    }
  }
</style>