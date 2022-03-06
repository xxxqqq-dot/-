<template>
  <div class="similarSingerContainer">
    <div class="singerItem" v-for="item in similarSinger" :key="item.id" @click="toSingerDetail(item)">
      <img :src="item.picUrl" alt="">
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import {mixin} from '../../plugins/mixin'
export default {
  name: 'SimilarSinger',
  data(){
    return {
      similarSinger: [],
    }
  },
  props: ['singerId'],
  mixins: [mixin],
  watch: {
    sinerId: {
      immediate: true,
      handler(a){
        console.log('id',a)
      }
    }
  },
  methods:{
    async getSimilarSinger(){
      console.log(this.singerId)
      const {data} = await this.$request('/simi/artist', {
        params: {
          id: this.singerId
        }
      })
      this.similarSinger = data.artists
    }
  },
  mounted(){
    this.getSimilarSinger()
  }
}
</script>

<style lang="less" scoped>
  .similarSingerContainer{
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    .singerItem{
      width: 20%;
      padding-right: 20px;
      margin-bottom: 30px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      .name{
          height: 20px;
          font-size: 12px;
        }
    }
  }
</style>