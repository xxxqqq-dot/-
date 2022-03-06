<template>
    <div class="musicHeader">
      <div class="pic">
        <img :src="detailInfo[picUrl]" alt="">
      </div>
      <slot>
        <div class="introduction">
          <div class="musicListDescription">
            <div class="musicList">
              <span class="title">歌单</span>
              <span class="detailName">{{detailInfo.name}}</span>
            </div>
          </div>
          <div class="creator" v-if="detailInfo.creator">
              <img :src="detailInfo.creator.avatarUrl" alt="">
              <a href="javascript: 0" class="name">{{detailInfo.creator.nickname}}</a>
              <span class="createTime">{{$moment(detailInfo.createTime).format("YYYY-MM-DD")}}创建</span>
          </div>
          <div class="btn">
              <button>
                <i class="iconfont icon-bofang"></i>
                <span>播放全部</span>
                <i class="el-icon-plus"></i>
              </button>
              <button>
                <i class="iconfont icon-folder-add"></i>
                <span>收藏({{detailInfo.subscribedCount | showCount}})</span>
              </button>
              <button>
                <i class="iconfont icon-fenxiang"></i>
                <span>分享({{detailInfo.trackCount | showCount}})</span>
              </button>
              <button>
                <i class="iconfont icon-xiazai"></i>
                <span>下载全部</span>
              </button>
          </div>
          <div class="tag" v-if="detailInfo.tags&&detailInfo.tags.length">标签 : <span v-for="item in detailInfo.tags" :key="item">{{item}}</span></div>
          <div class="song" v-if="detailInfo.tracks">歌曲: {{detailInfo.tracks.length | showCount}}    播放: {{detailInfo.playCount | showCount}}</div>
            <div class="description">
            <div class="word" ref="word" :class="!showWord?'showWord':''">简介：{{detailInfo.description}}</div>
            <button @click="showWord=!showWord"><span v-show="isNeedShow" class="iconfont" :class="showWord?'icon-shangjiantou':'icon-xiajiantou'"></span></button>
          </div>
        </div>
      </slot>
    </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data(){
    return {
      input: '',
      isNeedShow: true,
      showWord: false,
    }
  },
  props: ['detailInfo','picUrl'],
  updated(){
    this.$refs.word&&(this.isNeedShow = this.$refs.word.clientWidth>=700?true:false)
  }
}
</script>

<style lang="less" scoped>
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
            .detailName{
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
  
</style>