<template>
  <div class="videoMVDetailContainer">
    <div class="videoDetailInfo">
      <div class="videoDeatilHeader" @click="$router.go(-1)">
        <span class="iconfont icon-zuo"></span>
        <span v-show="videoType=='video'">视频详情</span>
        <span v-show="videoType=='mv'">MV详情</span>
      </div>
      <video controls autoplay :src="videoUrl"></video>
      <div class="videorevelantContainer" v-if="videoType=='video'">
        <div class="creator">
          <div class="creatorInfo">
            <img v-if="videoDetailInfo.creator.avatarUrl" :src="videoDetailInfo.creator.avatarUrl" alt="">
            <img v-else :src="videoDetailInfo.coverUrl" alt="">
            <div class="creatorName" v-if="!videoDetailInfo.creator[0]">{{videoDetailInfo.creator.nickname}}</div>
            <div class="creatorName" v-else>{{videoDetailInfo.creator[0].userName}}</div>
          </div>
          <button class="attention">+ 关注</button>
        </div>
        <h1 class="videoTitle">{{videoDetailInfo.alg}}</h1>
        <div class="relevantTag">
          <button class="tag" v-for="item in videoDetailInfo.videoGroup" :key="item.id">{{item.name}}</button>
        </div>
      </div>
      <div class="mvRevelantContainer" v-else>
        <div class="creator">
          <div class="creatorInfo">
            <img v-if="videoDetailInfo.cover" :src="videoDetailInfo.cover" alt="">
            <img v-else :src="videoDetailInfo.cover" alt="">
            <div class="creatorName">{{videoDetailInfo.artists[0].name}}</div>
          </div>
          <button class="attention">+ 关注</button>
        </div>
        <h1 class="videoTitle">{{videoDetailInfo.name}}</h1>
      </div>
      <div class="optionBtn">
        <button>
          <div class="collect">
            <i class="iconfont icon-folder-add"></i>
            <span>赞({{videoDetailInfo.praisedCount}})</span>
          </div>
        </button>
        <button>
          <i class="iconfont icon-fenxiang"></i>
          <span>分享({{videoDetailInfo.shareCount | showCount}})</span>
        </button>
      </div>
      <Comment :detailId="relevantId" :type="videoType=='video'?'5':'1'"/>
    </div>
    <div class="relevantVideo">
      <div class="relevantVideoHeader">相关推荐</div>
      <div class="relevantVideoItem" v-for="item in relevantVideo" :key="item.vid">
        <VideoList :videoInfo="item" type="video">
          <template v-slot:default>
            <div class="relevantVideoInfo">
              <div class="relevantVideoTitle">{{item.title}}</div>
              <div class="name">{{item.creator[0].userName}}</div>
            </div>
          </template>
        </VideoList>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from '../../components/Video/VideoList'
import Comment from '../../components/MusicDetail/Comment'
export default {
  name: 'VideoMVDetail',
  data(){
    return {
      relevantVideo: [],
      type: 5
    }
  },
  props: ['videoUrl', 'videoDetailInfo', 'videoType', 'relevantId'],
  components: {
    VideoList,
    Comment
  },
  methods: {
    async getRelevantVideo(){
      const {data: res} = await this.$request('/related/allvideo', {
        params: {
          id: this.relevantId
        }
      })
      this.relevantVideo = res.data
    }
  },
  mounted(){
    this.getRelevantVideo()
  }
}
</script>

<style lang="less" scoped>
  .videoMVDetailContainer{
    display: flex;
    .videoDetailInfo{
      width: 500px;
      margin-right: 20px;
      .videoDeatilHeader{
        margin: 10px 0;
        display: inline-block;
        cursor: pointer;
      }
      video{
        width: 100%;
        height: 250px;
      }
      .creator{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .creatorInfo{
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius: 25px;
            margin-right: 10px;
          }
          .creatorName{
            font-size: 12px;
          }
        }
        .attention{
          background-color: #fcf4f4;
          color: #ec4141;
          height: 30px;
          padding: 0 15px;
          border-radius: 15px;
          border: 0;
          cursor: pointer;
        }
      }
      .videoTitle{
        font-size: 20px;
      }
      .relevantTag{
        display: flex;
        flex-wrap: wrap;
        .tag{
          height: 20px;
          border-radius: 10px;
          padding: 0 5px;
          font-size: 12px;
          background-color: #f7f7f7;
          border: 0;
          margin: 10px 5px 10px 0;
        }
      }
      .optionBtn{
        display: flex;
        button{
          height: 30px;
          width: 100px;
          border-radius: 15px;
          font-size: 14px;
          background-color: transparent;
          border: 1px solid #d8d8d8;
        }
      }
    }
    .relevantVideo{
      flex: 1;
      .relevantVideoHeader{
        margin: 10px 0;
      }
      .relevantVideoItem{
        position: relative;
        margin-bottom: 10px;
        width: 150px;
        .relevantVideoInfo{
          position: absolute;
          width: 200px;
          left: 160px;
          top: 0;
          margin: 10px 0;
          .relevantVideoTitle{
            font-size: 14px;
            margin-bottom: 10px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .name{
            color: #9f9f9f;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    button{
      margin-right: 10px;
      cursor: pointer;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 1px solid #e5e5e5;
    }
  }
</style>