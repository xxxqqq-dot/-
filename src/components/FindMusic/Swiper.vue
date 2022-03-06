<template>
  <div class="swiper">
    <template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in swiperList" :key="item.imageUrl">
          <div class="img" @click="swiperOption(item)">
            <img :src="item.imageUrl" alt="">
            <div class="typeTitle" :style="{backgroundColor: item.titleColor}">{{item.typeTitle}}</div>
            <a v-show="item.url" :href="item.url"></a>
          </div>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>

<script>
import {mixin} from '../../plugins/mixin'
export default {
  name: 'Swiper',
  data(){
    return {
      swiperList: []
    }
  },
  mixins: [mixin],
  methods: {
    async getSwiperList(){
      const {data:res} = await this.$request.get('/banner')
      this.swiperList = res.banners
    },
    swiperOption(info){
      console.log(info)
      switch(info.targetType){
        case 1: this.getSongDetail(info.targetId); break
        case 10: this.detailMusicList('album', info.targetId); break
        case 1000: this.detailMusicList('music', info.targetId); break
      }
    },
   async getSongDetail(id){
      let {data} = await this.$request('/song/detail', {
        params: {
          ids: id
        }
      })
      this.playMusic(data.songs[0])
    }
  },
  mounted(){
    this.getSwiperList()
  },
}
</script>

<style lang="less" scoped>
  .img{
    position: relative;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .typeTitle{
      position: absolute;
      color: #fff;
      bottom: 0;
      right: 0;
      border-radius: 10px 0 10px 0;
      font-size: 12px;
      padding: 5px 10px;
      box-sizing: content-box;
    }
    a{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>