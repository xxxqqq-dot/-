<template>
  <div class="commentContainer">
    <div class="publishComment">
      <textarea v-model="personComment" maxlength="140" required="required" autofocus="autofocus" class="textbox"></textarea>
      <button @click="sendComment()">评论</button>
    </div>
    <div class="hotCommentList" v-if="hotComments.length">
      <div class="title">精彩评论</div>
      <div class="hotCommentItem" v-for="item in hotComments" :key="item.user.userId+item.content">
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
  name: 'Comment',
  data(){
    return {
      musicListComment: {},
      currentPage: 0,
      hotComments: [],
      allComment: [],
      total: 0,
      personComment: ''
    }
  },
  props: ['detailId', 'type'],
  methods: {
    async getMusicListComment(){
      let requestUrl = ''
      if(!this.$route.query.type) {
        requestUrl= this.$route.query.videoType == 'video'?'/comment/video':'/comment/mv'
      } else {
        requestUrl = this.$route.query.type == 'album'?'/comment/album':'/comment/playlist'
      }
      console.log('plm',requestUrl)
      const {data} = await this.$request(requestUrl, {
        params: {
          id: this.detailId,
          offset: this.currentPage
        }
      })
      if(data.hotComments){
        // this.hotComments = data.hotComments
        this.hotComments = Array.from(new Set(data.hotComments))
      }
      this.allComment = Array.from(new Set(data.comments))
      // this.allComment = data.comments
      this.total = data.total
      console.log('mmm',data)
    },
    handleCurrentChange(newpage){
      this.currentPage = newpage - 1
      this.getMusicListComment()
    },
    async sendComment(){
      const {data} = await this.$request('/comment', { 
        params: {
          t: 1,
          type: this.type,
          id: this.detailId,
          content: this.personComment
        }
      })
      this.personComment = ''
      if(data.code == 200){
        this.$message.success('评论成功')
      }
      console.log('lll',this.detailId,data)
    }
  },
  mounted(){
    this.getMusicListComment()
  }
}
</script>

<style lang="less" scoped>
  .commentContainer{
    .publishComment{
      position: relative;
      padding-bottom: 30px;
      .textbox{
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        width: 100%;
        height: 70px;
        outline: none;
        padding: 0 10px;
        margin-top: 20px;
        font-size: 18px;
        resize:none;
      }
      button{
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: 30px;
        width: 60px;
        border-radius: 15px;
        margin-right: 0;
        border: 1px solid #d8d8d8;
        background-color: transparent!important;
        cursor: pointer;
      }
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