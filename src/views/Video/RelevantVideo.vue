<template>
  <div class="relevantVideoContainer">
    <RelevantCate :hotTags="hotTags" :currentTag="currentTag" :isSelectTag="isSelectTag"
      @showTag="showTag()" @changeCurrentTag="changeCurrentTag">
      <template v-slot:default>
        <div class="allTag" @click="showTag('全部视频')">
          <span style="padding:5px 10px" :class="'全部视频'==currentTag?'activeClass':''">全部视频</span>
        </div>
        <div class="allTags">
          <div class="tagItem" v-for="item in allTags" :key="item.name" 
            :class="item.name==currentTag?'activeClass':''" @click="showTag(item.name, item.id)">
            {{item.name}}
            
          </div>
        </div>
      </template>
    </RelevantCate>
    <div class="videoList">
      <div class="videoItem"  v-for="item in videoList" :key="item.data.threadId">
        <VideoList :videoInfo="item.data" type="video"/>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from '../../components/Video/VideoList'
import RelevantCate from '../../components/RelevantCate.vue'
  export default {
    name: 'RelevantVideo',
    data(){
      return {
        allTags: [],
        hotTags: [],
        currentTag: '全部视频',
        videoList: [],
        isSelectTag: false
      }
    },
    components: {
      RelevantCate,
      VideoList
    },
    methods: {
      async getHotTags(){
        const {data: res} = await this.$request('/video/category/list')
        this.hotTags = res.data
      },
      async getAllTags(){
        const {data: res} = await this.$request('/video/group/list')
        this.allTags = res.data
      },
      async getAllVideo(){
        const {data: res} = await this.$request('/video/timeline/all')
        this.videoList = res.datas
      },
      async getTagVideo(id){
        const {data: res} = await this.$request('/video/group', {
          params: {
            id
          }
        })
        this.videoList = res.datas
      },
      changeCurrentTag(value,id){
        this.currentTag = value
        this.getTagVideo(id)
      },
      showTag(value,id){
        if(value == '全部视频'){
          this.getAllVideo()
        } else if(value){
          this.changeCurrentTag(value)
          this.getTagVideo(id)
        }
        this.isSelectTag = !this.isSelectTag
      }
    },
    mounted(){
      this.getHotTags()
      this.getAllTags()
      this.getAllVideo()
    }
  }
</script>

<style lang="less" scoped>
  .relevantVideoContainer{
    .allTags{
      width: 600px!important;
      height: 400px;
      display: flex;
      flex-wrap: wrap;
      color: #000;
      padding: 0 20px!important;
      overflow: auto;
      .tagItem{
        padding: 5px 0;
        width: 20%;
        text-align: center;
        margin: 10px 0;
        font-size: 12px;
        cursor: pointer;
      } 
      .tagItem:hover{
        color: #ec4141;
      }
    } 
    .allTags::-webkit-scrollbar{
      display:none;
    }
    .videoList{
      display: flex;
      flex-wrap: wrap;
      .videoItem{
        margin-top: 10px;
        width: 33%;
        padding-right: 10px;
        video{
          width: 100%;
          border-radius: 10px;
        }
      }
    }
  }
</style>