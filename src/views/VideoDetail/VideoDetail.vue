<template>
  <div class="videoDetailContainer">
    <VideoMVDetail :videoUrl="videoUrl" :videoDetailInfo="videoDetailInfo" videoType="video" :relevantId="videoDetailInfo.vid"/>
  </div>
</template>

<script>
import VideoMVDetail from '../../components/Video/VideoMVDetail'

  export default {
    name: 'VideoDetail',
    data(){
      return {
        videoUrl: '',
        videoDetailInfo: JSON.parse(this.$route.query.videoDetailInfo),
        relevantVideo: [],
        showVideoDetail: true
      }
    },
    components: {
      // Comment,
      // VideoList,
      VideoMVDetail
    },
    watch: {
      $route(to,from){
        this.videoDetailInfo = JSON.parse(to.query.videoDetailInfo)
        this.getVideoUrl()
        this.getVideoComment()
        this.getRelevantVideo()
      }
    },
    methods: {
      async getVideoUrl(){
        const {data} = await this.$request('/video/url', {
          params: {
            id: this.videoDetailInfo.vid
          }
        })
        this.videoUrl = data.urls[0].url
      },
    },
    mounted(){
      this.getVideoUrl()
    }
  }
</script>

<style lang="less" scoped>
  .videoDetailContainer{
    margin: 0 50px;
  
  }
</style>