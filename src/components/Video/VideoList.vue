<template>
  <div class="videoListContainer">
    <div class="videoContainer" v-if="type=='video'">
      <div class="img" @click="toVideoDetail(videoInfo)">
        <img :src="videoInfo.coverUrl"/>
        <div class="playTime"><i class="iconfont icon-24gl-play"></i>{{videoInfo.playTime | showCount}}</div>
        <div class="durationms">{{videoInfo.durationms | detailTime}}</div>
      </div>
      <slot>
        <div class="relevantVideoInfo">
          <div class="videoTitle">{{videoInfo.title}}</div>
          <div v-if="videoInfo.creator" class="name">{{videoInfo.creator.nickname}}</div>
        </div>
      </slot>
    </div>
    <div class="MVContainer" v-else>
    <div class="img" @click="toVideoDetail(videoInfo)">
      <img :src="videoInfo.cover"/>
      <div class="playTime"><i class="iconfont icon-24gl-play"></i>{{videoInfo.playCount | showCount}}</div>
    </div>
    <div class="relevantVideoInfo">
      <div class="videoTitle">{{videoInfo.name}}</div>
      <div v-if="videoInfo.artists" class="name">{{videoInfo.artists[0].name}}</div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoList',
    props: ['videoInfo', 'type'],
    methods: {
      toVideoDetail(info){
        if(this.type=='video'){
          this.$router.push({
            path: '/Home/VideoDetail',
            query: {
              videoDetailInfo: JSON.stringify(info),
              videoType: this.type
            }
          })
        } else {
          this.$router.push({
            path: '/Home/MVDetail',
            query: {
              videoDetailInfo: JSON.stringify(info),
              videoType: this.type
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .videoListContainer{
    .img{
      position: relative;
      margin-right: 10px;
      // height: 190px;
      img{
        width: 100%;
        max-height: 190px;
        object-fit:cover;
        border-radius: 5px;
      }
      .playTime{
        position: absolute;
        color: #fff;
        right: 10px;
        top: 0;
        font-size: 12px;
      }
      .durationms{
        position: absolute;
        color: #fff;
        right: 10px;
        bottom: 5px;
        font-size: 12px;
      }
    }
    video{
      width: 100%;
      border-radius: 10px;
    }
    .videoTitle{
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 5px;
    }
    .name{
      font-size: 12px;
      color: #cfcfdf;
      cursor: pointer;
    }
    .name:hover{
      color: #bf9f9f;
    }
  } 
</style>
