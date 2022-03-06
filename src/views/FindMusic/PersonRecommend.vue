<template>
  <div class="personRecommendContainer" v-if="!loading">
    <Swiper/>
    <div class="title">推荐歌单></div>
    <div class="recommendMusicList">
      <MusicList :musicList="recommendMusicList" :imgUrl="imgUrl" type="music"/>
    </div>
  </div>
  <div class="showLoading" v-else
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
    </div>
</template>

<script>
import MusicList from '../../components/FindMusic/MusicList'
import Swiper from '../../components/FindMusic/Swiper'
export default {
  name: 'PersonRecommend',
  data(){
    return {
      recommendMusicList: [],
      id: '',
      imgUrl: 'picUrl',
      loading: false
    }
  },
  components: {
    Swiper,
    MusicList
  },
  methods: {
    async getRecommendMusicList(){
      this.loading = true
      const {data} = await this.$request('/personalized', {params: {limit: 10}})
      this.recommendMusicList = data.result
      this.loading = false
    }
  },
  mounted(){
    this.getRecommendMusicList()
  }
}
</script>

<style lang="less" scoped>
  .title{
    font-size: 20px;
  }
  .showButton{
    opacity: 1!important;
  }
</style>