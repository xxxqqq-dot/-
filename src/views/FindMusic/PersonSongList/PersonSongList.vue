<template>
  <div class="PersonSongListContainer" v-if="!loading">
    <div class="songListRecommend" v-if="tagsSongList[0]">
      <img :src="tagsSongList[0].coverImgUrl" alt="">
      <div class="title">
        <div class="tag"><span class="iconfont icon-huangguan_king"></span>精品歌单</div>
        <div  class="name">{{songList[0].name}}</div>
      </div>
    </div>
    <RelevantCate :currentTag="currentTag" :hotTags="hotTags" 
      :tags="tags" :cateTag="cateTag" :relevantIcon="relevantIcon" :isSelectTag="isSelectTag"
      @changeCurrentTag="changeCurrentTag"
      @showTag="showTag"/>
    <MusicList :musicList="songList" imgUrl="coverImgUrl" type="music"/>
  </div>
  <div class="showLoading" v-else
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  </div>
</template>

<script>
import MusicList from '../../../components/FindMusic/MusicList'
import RelevantCate from '../../../components/RelevantCate.vue'
// import {mixin} from '../../../plugins/mixin'
export default {
  name: 'PersonSongList',
  data(){
    return {
      tags: [],
      songList: [],
      currentTag: this.$route.params.tag||'华语',
      id: '',
      hotTags: [],
      tagsSongList: [],
      cateTag: {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': []
      },
      relevantIcon: [
        'icon-yuzhong',
        'icon-fengge',
        'icon-changjing',
        'icon-xiaolian',
        'icon-zhuti'
      ],
      isSelectTag: false,
      limit: 50,
      loading: false
    }
  },
  components: {
    MusicList,
    RelevantCate
  },
  methods: {
    async getPersonSongList(){
      this.loading = true
      const {data} = await this.$request('/top/playlist',{
        params: {
          cat: this.currentTag,
          limit: this.limit
        }
      })
      this.loading = false
      this.songList = Array.from(new Set(data.playlists))
    },
    async getTagsSongList(){
      const {data} = await this.$request('/top/playlist/highquality',{
        params: {
          cat: this.currentTag
        }
      })
      this.tagsSongList = data.playlists
    },
    async getHotTags(){
      const {data} = await this.$request('/playlist/hot')
      this.hotTags = data.tags
    },
    async getTags(){
      const {data} = await this.$request('/playlist/catlist')
      this.tags = data
      for(let i in this.cateTag){
        this.cateTag[i] = data.sub.filter(item => {
          return item.category == i
        })
      }
    },
    changeCurrentTag(currentTag){
      this.currentTag = currentTag
      this.getPersonSongList()
      this.getTagsSongList()
    },
    showTag(tag){
      if(tag){
        this.changeCurrentTag(tag)
      }
      this.isSelectTag = !this.isSelectTag
    },
    loadMoreMusic(){
      this.limit+=50
      this.getPersonSongList()
    },
  },
  // mixins: [mixin],
  mounted(){
    this.getPersonSongList()
    this.getTagsSongList()
    this.getHotTags()
    this.getTags()
  }
}
</script>

<style lang="less" scoped>
  .PersonSongListContainer{
    margin-top: 70px;
    .songListRecommend{
      cursor: pointer;
      height: 180px;
      background-image:linear-gradient(to right,#aaa69f,#261c18, #927362, #2b2321, #a9a49d);
      border-radius: 10px;
      display: flex;
      align-items: center;
      img{
        width: 140px;
        height: 140px;
        margin: 0 15px;
        border-radius: 10px;
      }
      .title{
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 14px;
        .tag{
          color: #e7aa5a;
          height: 30px;
          width: 100px;
          border: 1px solid #e7aa5a;
          line-height: 30px;
          border-radius: 15px;
          margin-bottom: 20px;
          span{
            margin-right: 5px;
          }
        } 
        .name{
          color: #fff;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
</style>