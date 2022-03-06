<template>
  <div class="mvDetailContainer">
    <VideoMVDetail :videoUrl="mvUrl" :videoDetailInfo="mvDetailInfo" videoType="mv" :relevantId="mvDetailInfo.id"/>
  </div>
</template>

<script>
import VideoMVDetail from '../../components/Video/VideoMVDetail'
export default {
  name: 'MVDetail',
  data(){
    return {
      mvUrl: '',
      mvDetailInfo: JSON.parse(this.$route.query.videoDetailInfo)
    }
  },
  components: {
    VideoMVDetail
  },
  methods: {
    async getMVUrl(){
      const {data: res} = await this.$request('/mv/url', {
        params: {
          id: this.mvDetailInfo.id
        }
      })
      this.mvUrl = res.data.url
    }
  },
  mounted(){
    this.getMVUrl()
  }
}
</script>

<style lang="less" scoped>
  .mvDetailContainer{
    margin: 0 20px;
  }
</style>