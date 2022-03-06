<template>
  <div class="topListContainer">
    <div class="top" v-show="!loading">
      <div class="officialTop">
        <h1 class="title">官方榜</h1>
        <div class="relevantTop" v-for="(item,index) in officalTopList" :key="item.id">
          <div class="img" @mouseover="id=item.id" @mouseleave="id=''"  @click="detailMusicList('music',item)">
            <img :src="item.coverImgUrl" alt="">
            <button class="topListPlay" :class="{'showButton':item.id==id}"><i class="iconfont icon-bofang"></i></button>
          </div>
          <ul v-if="officalTopListSummary[index]">
            <li v-for="(item1,i) in officalTopListSummary[index]" :key="item1.id" @dblclick="playMusic(item1,officalTopListMusic[index])">
              <div class="musicname">
                <span class="musicIndex">{{i+1}}</span>
                <span class="name">{{item1.name}}</span>
                <span v-if="item1.alia.length" class="originalName">({{item1.alia[0]}})</span>
              </div>
              <span class="arName"><span v-for="(i1,i2) in item1.ar" :key="i2">{{i1.name}}</span></span>
              <!-- <span>1111111</span> -->
            </li>
            <div class="lookAll" @click="detailMusicList('music',item)">查看全部 ></div>
          </ul>
        </div>
      </div>
      <div class="globalTop">
        <h1 class="title">全球榜</h1>
        <div class="globalTopList">
          <MusicList :musicList="globalTopList" imgUrl="coverImgUrl" type="music">
            <template v-slot:btn="listInfo">
              <button class="topListPlay" :class="{'showButton':listInfo.currentId==listInfo.id}"><i class="iconfont icon-bofang"></i></button>
            </template>
          </MusicList>
        </div>
      </div>
    </div>
    <div class="showLoading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
  </div>
</template>

<script>
import {mixin} from '../../../plugins/mixin'
import MusicList from '../../../components/FindMusic/MusicList.vue'
export default {
  name: 'TopList',
  data(){
    return {
      topList: [],
      officalTopList: [],
      officalTopListSummary: [],
      globalTopList: [],
      id: '',
      officalTopListMusic: [],
      loading: false
    }
  },
  components: {
    MusicList
  },
  methods: {
    async getTopList(){
      this.loading = true
      const {data} = await this.$request('/toplist')
      this.topList = data.list
      this.officalTopList = data.list.splice(0,4)
      this.globalTopList = data.list
      this.officalTopList.forEach(async item => {
        const {data:res} = await this.$request('/playlist/detail', {
          params:{
            id: item.id
          }
        })
        this.officalTopListMusic.push(res.playlist.tracks)
        this.officalTopListSummary.push(res.playlist.tracks.slice(0,5))
      })
      this.loading = false
    },
  },
  mixins: [mixin],
  mounted(){
    this.getTopList()
  }
}
</script>

<style lang="less" scoped>
  .topListContainer{
    margin-top: 70px;
    .title{
      font-size: 20px;
      margin-bottom: 15px;
    }
    .relevantTop{
      margin-bottom: 20px;
      cursor: default;
      .img{
        position: relative;
        margin-right: 20px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
    .officialTop{
      .relevantTop{
        display: flex;
        font-size: 12px;
        color: #9b9b9b;
        .img{
          width: 180px;
          height: 180px;
        }
        ul{
          flex: 1;
          li{
            display: flex;
            justify-content: space-between;
            height: 35px;
            line-height: 35px;
            padding: 0 10px;
            .musicname{
              max-width: 500px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span{
                margin-right: 10px;
              }
              .name{
                color: #353535;
              }
              .musicIndex{
                font-size: 14px;
              }
            }
            .arName>span:not(:last-child)::after{
              content: '/ '
            }
          }
          li:nth-child(odd){
            background-color: #f9f9f9;
          }
          li:nth-child(-n+3) .musicIndex{
            color: #ec4141;
          }
          li:hover{
            background-color: #f4f4f4;
          }
          .lookAll{
            padding-left: 10px;
            margin-top: 5px;
            cursor: pointer;
          }
          .lookAll:hover{
            color: #000;
          }
        }
      }
    }
    .globalTop{
      .globalTopList{
        display: flex;
        flex-wrap: wrap;
        .relevantTop{
          width: 20%;
          .name{
            font-size: 14px;
          }
        }
      }
    }
  }
</style>