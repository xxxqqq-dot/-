<template>
  <div class="MusicListCommentContainer">
   <textarea maxlength="140" required="required" autofocus="autofocus" class="textbox"></textarea>
    <div class="hotCommentList" v-if="hotComments.length">
      <div class="title">精彩评论</div>
      <div class="hotCommentItem" v-for="item in hotComments" :key="item.user.userId">
        <img :src="item.user.avatarUrl" alt="">
        <div class="commentInfo">
          <div class="user">
            <div class="username">{{item.user.nickname}}：</div>
            <div class="content">{{item.content}}</div>
          </div>
          <div class="time" v-if="item.time">{{$moment(item.time).format('YYYY-MM-DD  h:mm')}}</div>
        </div>
      </div>
    </div>
    <div class="commentList">
      <div class="title">全部评论</div>
      <div class="hotCommentItem" v-for="(item,index) in allComment" :key="item.user.userId+index">
        <img :src="item.user.avatarUrl" alt="">
        <div class="commentInfo">
          <div class="user">
            <div class="username">{{item.user.nickname}}：</div>
            <div class="content">{{item.content}}</div>
          </div>
          <div class="time" v-if="item.time">{{$moment(item.time).format('YYYY-MM-DD  h:mm')}}</div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination background :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicListComment',
  data(){
    return {
      musicListComment: {},
      currentPage: 0,
      hotComments: [],
      allComment: [],
      total: 0,
      detailInfo: this.$store.state.detailInfo
    }
  },
  methods: {
    async getMusicListComment(){
      let requestUrl = this.detailInfo.artists?'/comment/album':'/comment/playlist'
      const {data} = await this.$request(requestUrl, {
        params: {
          id: this.detailInfo.id,
          offset: this.currentPage
        }
      })
      if(data.hotComments){
        this.hotComments = data.hotComments
      }
      this.allComment = data.comments
      this.total = data.total
    },
    handleCurrentChange(newpage){
      this.currentPage = newpage - 1
      this.getMusicListComment()
    }
  },
  mounted(){
    this.getMusicListComment()
  }
}
</script>

<style lang="less" scoped>
  .MusicListCommentContainer{
    .textbox{
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      width: 100%;
      height: 70px;
      outline: none;
      padding: 0 10px;
      margin: 20px 0;
      font-size: 18px;
      resize:none;
    }
    .commentList,.hotCommentList{
      .title{
        font-weight: bold;
      }
      .hotCommentItem{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-top: 20px;
        border-bottom: 1px solid #e5e5e5;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .commentInfo{
          font-size: 12px;
          .user{
            flex: 1;
            display: flex;
            
            max-width: 500px;
            .content{
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #373737;
            }
            .username{
              color: #507daf;
            }
          }
          .time{
            color: #9f9f9f;
            margin-top: 10px;
          }
        }
      }
      .page{
        
        .el-pagination{
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  
</style>