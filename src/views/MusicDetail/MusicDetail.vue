<template>
  <div class="musicDetailContainer" v-if="$store.state.showComponent">
    <div class="musicDetail" v-show="!loading">
      <div class="musicHeader">
        <div class="pic">
          <img :src="imgUrl" alt="">
        </div>
        <div class="introduction">
          <div class="musicListDescription">
            <div class="musicList">
              <span class="title">{{title}}</span>
              <span class="musicListName">{{playlist.name}}</span>
            </div>
          </div>
          <div class="creator">
            <img v-if="playlist.creator" :src="playlist.creator.avatarUrl" alt="">
            <span v-else class="title">歌手：</span>
            <a href="javascript: 0" class="name">{{arName}}</a>
            <span class="createTime">{{$moment(playlist.createTime).format("YYYY-MM-DD")}}创建</span>
          </div>
          <div class="btn">
              <button @click="playAll">
                <i class="iconfont icon-bofang"></i>
                <span>播放全部</span>
                <i class="el-icon-plus"></i>
              </button>
              <button @click="saveCollectList(playlist)">
                <div class="collect" v-if="!isCollect">
                  <i class="iconfont icon-folder-add"></i>
                  <span>收藏({{playlist.subscribedCount | showCount}})</span>
                </div>
                <div class="cancelCollect" v-else>
                  <i class="iconfont icon-iconfolderchecked"></i>
                  <span>已收藏({{playlist.subscribedCount | showCount}})</span>
                </div>
              </button>
              <button>
                <i class="iconfont icon-fenxiang"></i>
                <span>分享({{shareCount | showCount}})</span>
              </button>
              <button @click="download()">
                <i class="iconfont icon-xiazai"></i>
                <span>下载全部</span>
              </button>
          </div>
          <div class="tag" v-if="playlist.tags&&playlist.tags.length">标签 : 
            <span v-for="item in playlist.tags" :key="item" @click="toPersonSongList(item)">{{item}}</span>
          </div>
          <div class="song" v-if="playlist.tracks">歌曲: {{playlist.tracks.length | showCount}}    播放: {{playlist.playCount | showCount}}</div>
          <div class="description">
            <div class="word" ref="word" :class="!showWord?'showWord':''">简介：{{playlist.description}}</div>
            <button v-if="this.$refs.word" @click="showWord=!showWord"><span v-show="isNeedShow" class="iconfont" :class="showWord?'icon-shangjiantou':'icon-xiajiantou'"></span></button>
          </div>
        </div>
      </div>
      <div class="musicMain">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
          active-text-color="#ec4141" @select="changeActiveIndex">
          <el-menu-item index="SongList">歌曲列表</el-menu-item>
          <el-menu-item index="Comment">评论({{commontCount}})</el-menu-item>
          <el-menu-item index="subscribedCount">收藏者</el-menu-item>
        </el-menu>
        <div class="searchPlayList">
          <input class="ipt" v-if="$route.path=='/Home/MusicDetail'" placeholder="搜索歌单音乐" v-model="input" @input="searchPlayListMusic"/>
          <span v-show="input" class="iconfont icon-qingkong" @click="clearInput"></span>
        </div>
          <SongList v-show="activeIndex == 'SongList'" :playlist="musicList"/>
          <Comment :detailId="musicListInfoId" :type="type" v-show="activeIndex == 'Comment'"/>
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
import saveAs from 'file-saver';
import {mixin} from '../../plugins/mixin'
import {mapActions, mapMutations, mapState} from 'vuex'
import SongList from '../../components/MusicDetail/SongList'
import Comment from '../../components/MusicDetail/Comment'
export default {
  name: 'MusicDetail',
  data(){
    return {
      musicListInfoId: this.$route.query.detailInfoId,
      detailId: '',
      showWord: false,
      playlist: {},
      input: '',
      timer: null,
      isNeedShow: true,
      imgUrl: '',
      commontCount: 0,
      arName: '',
      title: '歌单',
      musicList: [],
      activeIndex: 'SongList',
      loading: false,
      isCollect: false,
      shareCount: 0,
      type: this.$route.query.type == 'music'?'2':'3'
    }
  },
  components: {
    SongList,
    Comment
  },
  computed: {
    ...mapState(['collectSongList']),
  },
  mixins: [mixin],
  methods: {
    ...mapActions(['saveCollectSongList']),
    ...mapMutations(['SAVE_PLAY_LIST']),
    async getPlayList(){
      this.loading = true
      if(this.$route.query.type == 'music'){
        const {data} = await this.$request('/playlist/detail', {
          params: {
            id: this.musicListInfoId
          }
        })
        this.playlist = data.playlist
        this.musicList = data.playlist.tracks
        this.imgUrl = this.playlist.coverImgUrl
        this.commontCount = this.playlist.commentCount
        this.arName = this.playlist.creator.nickname
        this.title = '歌单'
        this.shareCount = this.playlist.trackCount
        this.SAVE_PLAY_LIST(this.musicList)
      } else {
        const {data} = await this.$request('album', {
          params: {
            id: this.musicListInfoId
          }
        })
        this.playlist = data.album
        this.musicList = data.songs
        this.imgUrl = this.playlist.picUrl
        this.commontCount = this.playlist.info.commentThread.commentCount
        this.arName = this.playlist.artists[0].name
        this.title = '专辑'
        this.shareCount = this.playlist.info.shareCount
        this.SAVE_PLAY_LIST(this.musicList)
      }
      this.loading = false
    },
    searchPlayListMusic(val){
      if(this.timer){
        clearTimeout(this.timer)
      } else {
        this.searchPlayList()
      }
      this.timer = setTimeout(()=>{
        this.timer = null
        this.searchPlayList()
      },1000)
    },
    clearInput(){
      this.input = ''
    },
    searchPlayList(){
      if(!this.input) return
      let newPlayList = JSON.parse(JSON.stringify(this.musicList))
      newPlayList = newPlayList.filter(item => {
        return item.name.indexOf(this.input)!==-1
      })
      let replaceReg = new RegExp(this.input, 'ig')
      // let replaceString = `<span class="replaceClass">${this.input}</span>`
      newPlayList = newPlayList.map(item => {
        item.name = item.name.replace(replaceReg, `<span style="color: blue;">$&</span>`)
        return item
      })
      this.SAVE_PLAY_LIST(newPlayList)
    },
    changeActiveIndex(index){
      this.activeIndex = index
    },
    toPersonSongList(tag){
      this.$router.push({
        name: 'PersonSongList',
        params: {
          tag
        }
      })
    },
    playAll(){
      this.playMusic(this.musicList[0],this.musicList)
    },
    saveCollectList(value){
      if(this.$route.query.type == 'album') return
      if(value){
        this.saveCollectSongList(value)
        !this.isCollect?this.$message.success('收藏成功'):this.$message.error('已取消收藏')
      }
     this.isCollect =  this.collectSongList.some(item => item.id == this.musicListInfoId)
    },
    download(){
      var FileSaver = require('file-saver');
      FileSaver.saveAs('http://m701.music.126.net/20211202104448/33594d5a6f7f5c08eacc1a87becde006/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/11338345178/7548/36e2/7401/ee099a0d134be09c90039b1a3267d97d.mp3')
    }
  },
  watch: {
    // detailId(){
    //   this.getPlayList()
    // },
    input(){
      if(!this.input){
        this.SAVE_PLAY_LIST(this.musicList)
      }
    },
    $route(to,from){
      console.log(122)
      if(to.path == '/Home/MusicDetail'){
        this.musicListInfoId = this.$route.query.detailInfoId
        this.isNeedSkip()
        this.activeIndex = 'SongList'
      }
    },
    musicListInfoId(){
      this.getPlayList()
      // this.isCollect = (this.collectSongList.indexOf(this.musicListInfo) !== -1)
    }
  },
  mounted(){
    // this.musicListInfoId = this.$route.query.detailInfoId
    this.isCollect = false
    this.detailId = this.musicListInfoId
    this.saveCollectList()
    this.getPlayList()
  },
  updated(){
    this.saveCollectList()
    this.$refs.word&&(this.isNeedShow = this.$refs.word.clientWidth>=700?true:false)
  }
}
</script>

<style lang="less" scoped>
  .musicDetailContainer{
    margin-top: 20px;
    .musicHeader{
      display: flex;
      width: 100%;
      overflow: hidden;
      img{
        width: 200px;
        height: 200px;
        border-radius: 10px;
        // float: left;
        margin-right: 10px;
      }
      .introduction{
        flex: 1;
        .musicListDescription{
          .musicList{
            display: flex;
            align-items: center;
            .title{
              border: 1px solid #ec4141;
              border-radius: 3px;
              padding: 2px 3px;
              color: #ec4141;
              font-size: 12px;
              margin-right: 10px;
            }
            .musicListName{
              font-size: 25px;
              font-weight: bold;
            }
          }
        }
        .creator{
          margin-top: 10px;
          display: flex;
          align-items: center;
          font-size: 12px;
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .createTime{
            color: #bbb;
            margin-left: 10px;
          }
          .name{
            color: #0b58b0;
          }
        }
        .btn{
            height: 30px;
            display: flex;
            align-items: center;
            margin: 15px 0;
            button{
              height: 30px;
              display: flex;
              align-items: center;
              border-radius: 20px;
              border: 0;
              padding: 0 10px;
              margin: 0 10px;
              .collect,.cancelCollect{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
              }
              span{
                margin: 0 4px;
              }
            }
            button:nth-child(1){
              background-color: #d73535;
              color: #fff;
              i{
                font-size: 12px;
              }
            }
            button:nth-child(1):hover{
              background-color: #cc3232;
            }
            button:not(:first-child):hover{
              background-color: #f2f2f2;
              color: #936266;     
            }
            i{
              font-size: 18px;
            }
        }
        .tag{
          font-size: 14px;
          span{
            color: #507daf;
            cursor: pointer;
          }
          span:not(:last-child):after{
            content: ' / ';
            cursor: auto
          }
        }
        .song{
          font-size: 14px;
          color: #676767;
          margin: 5px 0;
        }
        .description{
          position: relative;
          font-size: 14px;
          color: #676767;
          overflow: hidden;
          .word{
            display: inline-block;
            max-width: 700px;
          }
          button{
            position: absolute;
            width: 14px;
            height: 14px;
            top: 0;
            right: 0;
            border: 0;
            background-color: transparent;
            color: #999999;
          }
          .showWord{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .musicMain{
      position: relative;
      .el-menu-item{
        color: #373737;
      }
      .searchPlayList{
        position: absolute;
        top: 18px;
        right: 0;
        .ipt{ 
          width: 200px;
          height: 24px;
          outline: none;
          border: 0;
          border-radius: 12px; 
          background-color: #f7f7f7;
          padding-left: 12px;
          color: #c8c8c8;
        }
        span{
          position: absolute;
          top: 50%;
          right: 5px;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 10px;
          line-height: 20px;
        }
      }
    }
    .el-menu{
      .el-menu--horizontal{
        border: 0!important;
      }
    }
  }
</style>