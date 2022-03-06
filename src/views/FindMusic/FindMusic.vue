<template>
  <div class="findMusic">
    <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/Home/FindMusic/PersonRecommend">个性推荐</el-menu-item>
      <el-menu-item index="/Home/FindMusic/PersonSongList">歌单</el-menu-item>
      <el-menu-item index="/Home/FindMusic/TopList">排行榜</el-menu-item>
      <el-menu-item index="/Home/FindMusic/Singer">歌手</el-menu-item>
      <el-menu-item index="/Home/FindMusic/NewMusic">最新音乐</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
// import {mixin} from '../../plugins/mixin'
import Swiper from '../../components/FindMusic/Swiper'
export default {
  name: 'FindMusic',
  data(){
    return {
      
    }
  },
  components: {
    Swiper
  },
  methods: {
    find(str,char,num){
      let x=str.indexOf(char);
      for(var i=0;i<num;i++){
          x=str.indexOf(char,x+1);
      }
      return x;
    }
  },
  computed: {
    path(){
      let currentPath = this.$route.path
      let index = this.find(currentPath,'/',3)
      currentPath = currentPath.substring(0,index)
      return index!=-1?currentPath.substring(0,index):this.$route.path
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="less" scoped>
  .findMusic{
    margin-top: 60px;
    .el-menu{
      position: fixed;
      top: 60px;
      z-index: 10;
      width: 100%;
    }
  }
  .el-menu-demo{
    border-bottom: none!important;
  }
</style>