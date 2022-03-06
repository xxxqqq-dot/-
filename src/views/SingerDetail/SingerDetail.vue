<template>
  <div class="singerDetailContainer" v-if="this.$store.state.showComponent">
    <!-- <DetailHeader :detailInfo="singerDetail" picUrl="artist[cover]"/> -->
    <div class="singerDetailHeader">
      <img :src="imgUrl" alt="">
      <div class="singerDetailInfo">
        <div class="name">{{singerDetailInfo.name}}</div>
        <div class="alias">
          <span v-for="item in singerDetailInfo.alias" :key="item">{{item}}</span>
        </div>
        <div class="btns">
          <button class="collect">
            <i class="iconfont icon-folder-add"></i>
            <span>收藏</span>
          </button>
          <button class="home">
            <i class="iconfont icon-gerenzhuye"></i>
            <span>个人主页</span>
          </button>
        </div>
        <div class="count" v-if="singerDetail.artist">
          <div class="musicCount">单曲数：{{singerDetail.artist.musicSize}}</div>
          <div class="albumCount">专辑数：{{singerDetail.artist.albumSize}}</div>
          <div class="mvCount">MV数：{{singerDetail.artist.mvSize}}</div>
        </div>
      </div>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
      @select="changeActiveIndex">
      <el-menu-item index="Album">专辑</el-menu-item>
      <el-menu-item index="MV">MV</el-menu-item>
      <el-menu-item index="SingerDetailIntroduce">歌手详情</el-menu-item>
      <el-menu-item index="SimilarSinger">相似歌手</el-menu-item>
    </el-menu>
    <Album v-show="activeIndex == 'Album'" :singerId="singerDetailInfo.id"/>
    <MV v-show="activeIndex == 'MV'" />
    <SimilarSinger v-show="activeIndex == 'SimilarSinger'" :singerId="singerDetailInfo.id"/>
    <SingerDetailIntroduce v-show="activeIndex == 'SingerDetailIntroduce'" />
  </div>
</template>

<script>
import {mixin} from '../../plugins/mixin'
import Album from '../../components/SingerDetail/Album'
import MV from '../../components/SingerDetail/MV'
import SimilarSinger from '../../components/SingerDetail/SimilarSinger'
import SingerDetailIntroduce from '../../components/SingerDetail/SingerDetailIntroduce'
export default {
  name: 'SingerDetail',
  data(){
    return {
      singerDetailInfo: JSON.parse(this.$route.query.singerDetailInfo),
      singerDetail: {},
      showSingerDetail: true,
      imgUrl: '',
      activeIndex: 'Album'
    }
  },
  components: {
    Album,
    SingerDetailIntroduce,
    SimilarSinger,
    MV
  },
  methods: {
    async getSingerDetail(){
      const {data:res} = await this.$request('/artist/detail',{
        params: {
          id: JSON.parse(this.$route.query.singerDetailInfo).id
        }
      })
      this.singerDetail = res.data
      this.imgUrl = this.singerDetail.artist.cover
    }
  },
  mixins: [mixin],
  watch: {
    singerDetailInfo(){
      this.getSingerDetail()
    },
    $route(to,from){
      if(to.path == '/Home/SingerDetail'){
        this.singerDetailInfo = JSON.parse(to.query.singerDetailInfo)
        this.isNeedSkip()
        this.activeIndex = 'Album'
      }
    }
  },
  mounted(){
    this.getSingerDetail()
  }
}
</script>

<style lang="less" scoped>
  .singerDetailContainer{
    margin-top: 20px;
    .singerDetailHeader{
      display: flex;
      img{
        width: 180px;
        height: 180px;
        border-radius: 10px;
        margin-right: 15px;
      }
      .singerDetailInfo{
        .name{
          font-size: 24px;
          font-weight: bold;
        }
        .alias{
          margin-top: 10px;
          font-size: 12px;
        }
        .btns{
          display: flex;
          margin: 10px 0;
          button{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border: 1px solid #d8d8d8;
            // width: 80px;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #373737;
            border-radius: 15px;
            margin-right: 10px;
            cursor: pointer;
          }
          button:hover{
            background-color: #f2f2f2;
          }
        }
        .count{
          display: flex;
          font-size: 14px;
          color: #373737;
          div{
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>