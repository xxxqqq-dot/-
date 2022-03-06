<template>
  <div class="revelantMVContainer">
    <div class="newMV">
      <div class="mvCate">
        <h1 class="cateTitle" @click="toAllMV">最新MV ></h1>
        <div class="mvCateList">
          <div class="mvCateItem" v-for="item in areaList" :key="item" 
            @click="changeCurrentArea(item)" :class="item==currentArea?'activeClass':''">
            {{item}}
          </div>
        </div>
      </div>
      <div class="mvList">
        <div class="mvItem" v-for="item in newmvList" :key="item.id">
          <VideoList :videoInfo="item" type="mv"/>
        </div>
      </div>
    </div>
    <div class="exclusiveMV">
      <h1 class="cateTitle" @click="toAllMV">网易出品 ></h1>
      <div class="mvList">
        <div class="mvItem" v-for="item in exclusiveMVList" :key="item.id">
          <VideoList :videoInfo="item" type="mv"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from '../../components/Video/VideoList'
  export default {
    name: 'RevelantMV',
    data(){
      return {
        newmvList: [],
        exclusiveMVList: [],
        areaList: ['内地','港台','欧美','日本','韩国'],
        currentArea: '内地'
      }
    },
    components: {
      VideoList
    },
    methods: {
      async getnewMVList(){
        const {data: res} = await this.$request('/mv/first', {
          params: {
            limit: 6,
            area: this.currentArea
          }
        })
        this.newmvList = res.data
      },
      async getExclusiveMVList(){
        const {data: res} = await this.$request('/mv/exclusive/rcmd', {
          params: {
            limit: 6
          }
        })
        this.exclusiveMVList = res.data
      },
      toAllMV(){
        this.$router.push({
          path: '/Home/AllMV'
        })
      },
      changeCurrentArea(value){
        this.currentArea = value
        this.getnewMVList()
      }
    },
    mounted(){
      this.getnewMVList()
      this.getExclusiveMVList()
    }
  }
</script>

<style lang="less" scoped>
  .revelantMVContainer{
    margin-top: 10px;
    .cateTitle{
      cursor: pointer;
    }
    .mvCate{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .mvCateList{
        display: flex;
        .mvCateItem{
          height: 20px;
          padding: 0 10px;
          font-size: 12px;
          line-height: 20px;
          cursor: pointer;
        }
      }
    }
    .mvList{
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
      .mvItem{
        width: 33%;
      }
    }
  }
</style>