<template>
  <div class="footerContainer">
    <div class="playmusic">
      <div class="musicInfo" @click="showLyricDrawer">
        <img v-if="musicInfo" :src="picUrl" alt="">
        <div class="name" v-if="musicInfo">
          <div class="musicName">
            <div class="trigger" @mouseover="showMusicName"></div>
            <div class="showMusicName" ref="musicName" :style="{left: currentLeft + 'px'}">
              <div class="currentMusicName" ref="currentMusicName">
                {{musicInfo.name}}
              </div>
              <div class="showCurrentMusicName" v-if="musicNameWidth>=130">
                {{musicInfo.name}}
              </div>
            </div>
          </div>
          <div class="arName">
            <span v-for="item in arName" :key="item.id" @click.stop="toSingerDetail(item)">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="controlContainer">
        <div class="playControl">
          <span class="playway iconfont icon-shunxubofang-"></span>
          <span class="last iconfont icon-shangyiqu" @click="changeMusic('last')"></span>
          <span class="play iconfont" :class="isMusicPlay?'icon-zanting':'icon-bofang'" @click="musicPlay"></span>
          <span class="next iconfont icon-xiayiqu" @click="changeMusic('next')"></span>
          <span class="musicWord iconfont icon-geci"></span>
        </div>
        <div class="progressBarControl">
          <span>{{currentTime | detailTime}}</span>
          <div class="progressBar" ref="progressBar">
            <div class="currentProgressBar" :style="{width: currentWidth+'px'}">
              <div class="block" style="width: 400px" @mousedown="changeNeedUpdate">
                <el-slider v-model="currentWidth" @change="toCurrentTime"></el-slider>
              </div>
            </div>
          </div>
          <span>{{totalTime | detailTime}}</span>
        </div>
      </div>
      <audio v-if="playUrl" ref="audio" autoplay :src="playUrl" @timeupdate="updateTime"></audio>
      <div class="options">
        <div class="volumeControl">
          <span class="iconfont icon-shengyin"></span>
        </div>
        <div class="playlist">
          <span class="iconfont icon-24gf-playlist" @click="closeDrawer('rtl')"></span>
        </div>
      </div>
    </div>
    
    <div class="lyric">
      <el-drawer title="我是标题" :visible.sync="showlyric" direction="btt" 
        size="100%" :with-header="false" :modal="false">
        <span class="iconfont icon-xia" @click="showlyric=false"></span>
        <div class="pic">
          <img :src="picUrl" alt="" :class="isMusicPlay?'':'isplay'">
        </div>
        <div class="musicInfo">
          <div class="title">
            <div class="musicname">{{musicInfo.name}}</div>
            <div class="arname" v-if="musicInfo.ar">{{musicInfo.ar[0].name}}</div>
          </div>
          
          <div class="showlyric">
            <div class="topMask"></div>
            <div class="currentlyric" ref="q">
              <div class="eachlyric" v-for="(item,index) in this.lyric" 
                :key="index" :ref="'a'+index" 
                :class="index==currentIndex?'activeIndex':''"
              >{{item}}</div>
            </div>
            <div class="bottomMask"></div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {mixin} from '../../plugins/mixin'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Footer',
  data(){
    return {
      playUrl: '',
      musicInfo: window.localStorage.getItem('musicInfo')?JSON.parse(window.localStorage.getItem('musicInfo')):{},
      currentTime: 0,
      totalTime: 0,
      currentWidth: 0,
      currentIndex: 0,
      isplay: this.isMusicPlay,
      drawerValue: false,
      index: 0,
      isNeedUpdate: true,
      showlyric: false,
      lyricTime: [],
      lyric: [],
      isBack: true,
      timer: '',
      picUrl: window.localStorage.getItem('picUrl')||'',
      arName: window.localStorage.getItem('arName')?JSON.parse(window.localStorage.getItem('arName')):[],
      currentLeft: 0,
      lyricTimer: null,
      musicNameWidth: 0
    }
  },
  mixins: [mixin],
  methods: {
    async getPlayUrl(id){
      const {data:res} = await this.$request('/song/url', {
        params: {
          id
        }
      })
      this.playUrl = res.data[0].url
      window.localStorage.setItem('playUrl', this.playUrl)
    },
    updateTime(e){
      this.currentTime = e.target.currentTime*1000
      this.totalTime = e.target.duration*1000
      if(this.isNeedUpdate){
        this.currentWidth = e.target.currentTime/e.target.duration*400/4
      }
    },
    musicPlay(){
      this.playUrl = window.localStorage.getItem('playUrl')
      this.$store.commit('CHANGE_MUSIC_PLAY',!this.isMusicPlay)
      // console.log('wqoei',this.playUrl)
      if(this.$refs.audio){
        if(this.isMusicPlay){
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
      }
    },
    closeDrawer(){
      this.drawerValue = !this.drawerValue
      this.$emit('closeDrawer',this.drawerValue)
    },
    changeMusic(type){
      this.$store.commit('CHANGE_MUSIC_PLAY',true)
      if(type == 'last'){
        if(this.index == 0){
          this.index = this.currentPlayList.length - 1
        } else { this.index -- }
      } else {
        if(this.index == this.currentPlayList.length - 1){
          this.index = -1
        } else { this.index ++ }
      }
      this.musicInfo = this.currentPlayList[this.index]
      this.getPlayUrl(this.musicInfo.id)
      if(this.playUrl){
        this.$refs.audio.play()
      } 
        this.showLyric()
    },
    changeProgressBar(e){
      if(e.target !== this.$refs.progressBar) return
      this.$refs.audio.currentTime = this.totalTime / 1000 / 400 * e.offsetX
    },
    toCurrentTime(curValue){
      this.isNeedUpdate = true
      this.currentWidth = curValue
      this.$refs.audio.currentTime = this.totalTime / 1000 / 100 * this.currentWidth
    },
    changeNeedUpdate(){
      this.isNeedUpdate = false
    },
    showLyricDrawer(){
      // console.log(this.$refs.q)
      this.showlyric = !this.showlyric 
      this.showLyric()
    },
    async showLyric(){
      if(this.showlyric){
        const {data} = await this.$request('/lyric',{
          params: {
            id: this.musicInfo.id
          }
        })
        this.lyric = data.lrc.lyric.split("\n").map((item,index) => {
          item = item.substring(item.indexOf(']')+1,item.length)
          return item
        })
        this.lyricTime = data.lrc.lyric.split("\n").map(item => {
          item = item.substring(item.indexOf('[')+1,item.indexOf(']')-1).split(':')
          item = (item[0]*60 + parseInt(item[1]))*1000
          return item
        })
      }
      // console.log(this.lyricTime)
      // console.log(this.lyric)
      this.$refs.q&&this.$refs.q.addEventListener('mousewheel',this.handleScroll)
    },
    handleScroll(){
      this.isBack = false
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=>{
        this.isBack = true
      },2000)
    },
    showMusicName(e){
      if(this.lyricTimer||(this.musicNameWidth<=130)) return
      // console.log('jkh',this.musicNameWidth)
      this.lyricTimer = setInterval(()=>{
        let targetLeft = -(this.$refs.currentMusicName.clientWidth)
        let step = (targetLeft - this.$refs.musicName.offsetLeft) / 10000
        step = step>=0?Math.ceil(step):Math.floor(step)
        this.currentLeft = this.$refs.musicName.offsetLeft + step
        // console.log(step)
        if(step==0){
          clearInterval(this.lyricTimer)
          this.currentLeft = 0
          this.lyricTimer = null
        }
      },20)
    }
  },
  computed: {
    ...mapState(['isMusicPlay', 'currentPlayList'])
  },
  watch: {
    musicInfo(){
      window.localStorage.setItem('musicInfo', JSON.stringify(this.musicInfo))
      this.playUrl = window.localStorage.getItem('playUrl')
      this.$store.dispatch('saveCurrentPlayIndex', [this.index, this.musicInfo])
      clearInterval(this.lyricTimer)
      this.lyricTimer = null
      this.currentLeft = 0
    },
    currentTime(){
      if(!this.lyricTime.length||!this.isBack) return
      for(let i = 0;i<this.lyricTime.length;i++){
        if(this.lyricTime[i]<this.currentTime&&this.lyricTime[i+1]>=this.currentTime){
          this.currentIndex = i
        }
      }
    },
    currentIndex(){
      // console.log(this.currentIndex)
      // console.log(this.currentIndex-1)
      this.$refs.q.scrollTop = 30*(this.currentIndex-1)
      clearInterval(t)
      let t = setInterval(()=>{
        let step = (30*this.currentIndex - this.$refs.q.scrollTop)/3
        step=step>=0?Math.ceil(step):Math.floor(step)
        this.$refs.q.scrollTop = this.$refs.q.scrollTop + step
        if(step==0){
          clearInterval(t)
        }
      },20) 
      // this.$refs.q.scrollTop = 30*this.currentIndex
    }
  },
  mounted(){
    this.musicNameWidth = this.$refs.currentMusicName.clientWidth
    this.$bus.$on('play',(musicInfo) => {
      this.index = this.currentPlayList.findIndex(item => {
        return item.id == musicInfo.id
      })
      this.musicInfo = musicInfo
      if(musicInfo.al){
        this.picUrl = musicInfo.al.picUrl
        this.arName = musicInfo.ar
      } else {
        this.picUrl = musicInfo.album.blurPicUrl
        this.arName = musicInfo.artists
      }
      window.localStorage.setItem('picUrl', this.picUrl)
      window.localStorage.setItem('arName', JSON.stringify(this.arName))
      this.getPlayUrl(musicInfo.id)
    })
  },
  updated(){
    this.musicNameWidth = this.$refs.currentMusicName.clientWidth
  }
}
</script>

<style lang="less" scoped>
  .footerContainer{
    z-index: 12;
    position:fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-top: 1px solid #e1e1e1;
    background-color: #fff;
    .playmusic{
      display: flex;
      justify-content: space-between;
      height: 100%;
      >.musicInfo{
        display: flex;
        align-items: center;
        // width: 200px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 10px;
          margin: 0 10px;
        }
        .name{
          .arName{
            cursor: pointer;
            font-size: 12px;
            max-width: 130px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span:after{
              content: ' / ';
              cursor: default;
            }
            span:last-child:after{
              content: '';
            }
            span{
              cursor: pointer;
            }
          }
          .musicName{
            position: relative;
            left: 0;
            display: block;
            width: 130px;
            height: 24px;
            overflow: hidden;
            .trigger{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
            }
            .showMusicName{
              display: flex;
              position: absolute;
              height: 100%;
              top: 0;
              left: 0;
              white-space: nowrap;
              .currentMusicName{
                padding-right: 20px;
              }
              div{
                height: 100%;
              }
            }
          }
        }
      }
      .controlContainer{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .playControl{
          height: 50px;
          span{
            margin: 10px 15px;
            font-size: 18px;
          }
          .play{
            display: inline-block;
            background-color: #f4f4f4;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 50%;
          }
        }
        .progressBarControl{
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 12px;
          color: #bf9f9f;
          .progressBar{
            display: flex;
            align-items: center;
            width: 400px;
            height: 2px;
            background-color: #cdcdcd;
            margin: 0 10px;
            .currentProgressBar{
              position: relative;
              // width: 100px;
              height: 100%;
              background-color: #ff4e4e;
              .el-slider{
                position: absolute;
                width: 400px;
                height: 4px!important;      
              }
            }
          }
          span{
            margin: 0 5px;
          }
        } 
      }
      .options{
        display: flex;
        align-items: center;
        margin-right: 10px;
        .volumeControl{
            position: relative;
          }
        >div{ 
          width: 24px;
          height: 24px;
          .block{
            position: absolute;
            bottom: 35px;
            left: 12px;
            transform: translateX(-50%);
          }
          span{
            display: block;
            font-size: 18px;
            margin-right: 5px;
          }
        }
      }
    }
    .lyric{
      .el-drawer__body{
        .pic{
          img{
            width: 200px;
            height: 200px;
            border: 10px solid #cac9ca;
            border-radius: 50%;
            animation: animation 5s linear infinite;
            // animation-play-state:paused;
          }
        }
        .musicInfo{
          display: flex;
          flex-direction: column;
          align-items: center;
          // border: 1px solid #000;
          width: 400px;
          height: 500px;
          .title{
            width: 100%;
            height: 50px;
            div{
              text-align: center;
            }
            .musicname{
              font-weight: bold;
              font-size: 25px;
            }
          }
          .showlyric{
            position: relative;
            margin-top: 50px;
            margin-bottom: 20px;
            .currentlyric{          
              width: 100%;
              height: 360px;
              overflow: auto;
              // transition: scroll 1s;
              .eachlyric{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #636566;
                font-size: 14px;
                white-space: nowrap;
              }
              .eachlyric:first-child{
                margin-top: 180px!important;
              }
            }
            .currentlyric::-webkit-scrollbar{
              display:none;
            }
          }
          
        }
      }
    }
    .active{
      /* 将背景设为渐变 */
      background-image: -webkit-linear-gradient(top, white, #a4a4a4, #6a6b6b);
      /* 规定背景绘制区域 */
      background-clip: text;
      -webkit-background-clip: text;
      /* 将文字隐藏 */
      -webkit-text-fill-color: transparent;
    }
    .activeIndex{
      color: #000!important;
      font-size: 18px!important;
    }
    .topMask{
      position: absolute;
      top: 0;
      height: 30px;
      width: 100%;
      background-image: linear-gradient(#d2d0d1, transparent)
    }  
    .bottomMask{
      position: absolute;
      bottom: 0;
      height: 30px;
      width: 100%;
      background-image: linear-gradient(transparent, #f9f8f9)
    }
  }
  .isplay{
    animation-play-state:paused!important;
  }
  .showMusicName{
    animation-play-state:paused!important;
  }
  @keyframes animation {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(360deg);
    }
  }
  // @keyframes musicName {
  //   form {
  //     left: 0;
  //   } to {
  //     left: -200px;
  //   }
  // }
</style>