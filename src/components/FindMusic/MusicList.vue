<template>
  <div class="recommendMusicList">
    <div class="recommendMusicItem" 
      v-for="(item) in musicList" 
      :key="item.id"
      @click="detailMusicList(type,item.id)"
    >
      <div class="img" @mouseover="id=item.id" @mouseleave="id=''">
        <img class="musicImg" alt="" src="../../assets/images/loading.jpeg" v-lazyLoading="item[imgUrl]">
        <slot name="image"></slot>
        <div class="playCount" v-if="item.playCount">
          <i class="iconfont icon-24gl-play"></i>
          <span>{{item.playCount | showCount}}</span>
        </div>
        <slot name="btn" :currentId="item.id" :id="id">
          <button class="play" :class="{'showButton':item.id==id}"><i class="iconfont icon-bofang"></i></button>
        </slot>
      </div>
      <span class="musicListName">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import {mixin} from '../../plugins/mixin'
export default {
  name: 'MusicList',
  data(){
    return {
      id: ''
    }
  },
  props: ['musicList','imgUrl','type'],
  mixins: [mixin],
  directives: {
    
  }
}
</script>

<style lang="less" scoped>
  .recommendMusicList{
    display: flex;
    flex-wrap: wrap;
    .recommendMusicItem{
      width: 20%;
      padding: 20px;
      // padding-bottom: 10px;
      // box-sizing: border-box;
      font-size: 14px;
      .img{
        width: 100%;
        position: relative;
        .musicImg{
          width: 100%;
          // height: 100%;
          position: relative;
          border-radius: 10px;
          z-index: 1;
        };
        .play{
          opacity: 0;
          position: absolute;
          width: 25px;
          height: 25px;
          right: 15px;
          bottom: 15px;
          background-color: #fff;
          border: 0;
          border-radius: 50%;
          transition: opacity .3s linear;
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
        .playCount{
          position: absolute;
          right: 15px;
          top: 5px;
          color: #fff;
          height: 20px;
          line-height: 20px;
          z-index: 1;
          span{
            height: 100%;
            font-size: 12px;
          }
          i{
            font-size: 12px;
            margin-right: 5px;
          }
        }
      } 
      .musicListName{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }  
  .showButton{
    opacity: 1!important;
    z-index: 1;
  }
</style>