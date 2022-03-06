<template>
  <div class="newMusicContainer">
    <div class="titleContainer">
      <div class="title">
        <span class="newMusic" :class="$route.path=='/Home/FindMusic/NewMusic/NewMusicList'?'active':''" @click="toList('/Home/FindMusic/NewMusic/NewMusicList')">新歌速递</span>
        <span class="newDisc" :class="$route.path=='/Home/FindMusic/NewMusic/NewDiscList'?'active':''"  @click="toList('/Home/FindMusic/NewMusic/NewDiscList')">新碟上架</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'NewMusic',
  methods: {
    toList(path){
      this.$router.replace({
        path
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .newMusicContainer{
    // display: flex;
    
    margin-top: 70px;
    .titleContainer{
      display: flex;
      justify-content: center;
      .title{
        display: flex;
        justify-content: center;
        border: 1px solid #bbbbbb;
        height: 30px;
        width: 200px;
        border-radius: 16px;
        padding: 0;
        span{
          font-size: 12px;
          width: 100px;
          height: 28px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          cursor: default;
        }
        .newDisc{
          margin-right: -1px;
        }
        .newMusic{
          margin-left: -1px;
        }
        span:hover{
          background-color: #f4f4f4;
        }
      }
    }
    .active{
      margin-top: -1px;
      height: 30px!important;
      line-height: 30px;
      background-color: #bbbbbb!important;
      color: #fff;
    }
  }
</style>