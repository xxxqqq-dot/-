<template>
  <div class="newDiscListContainer">
    <NewMusicOption :cateType="cateType" @getNewList="changeCurrentArea">
      <div class="select">
        <SelectSinger :selectType="selectType" :activeType="selectType[0]['hot']" @changeType="changeCurrentType"/>
      </div>
    </NewMusicOption>
    <div class="allDist" v-show="!loading">
      <div class="distList" v-if="weekDistList.length">
        <div class="distTitle">本周新碟</div>
        <div class="dist">
          <MusicList :musicList="weekDistList" imgUrl="picUrl" type="album">
            <template v-slot:image>
              <img class="discImg" src="../../../assets/images/dist.png" alt="">
            </template>
            <template v-slot:btn="listInfo">
              <button class="topListPlay" :class="{'showButton':listInfo.currentId==listInfo.id}"><i class="iconfont icon-bofang"></i></button>
            </template>
          </MusicList>
        </div>
      </div>
      <div class="distList">
        <div class="distTitle"><div class="monthDistTitle">11</div><span>2021</span></div>
        <div class="dist">
          <MusicList :musicList="monthDistList" imgUrl="picUrl" type="album">
            <template v-slot:image>
              <img class="discImg" src="../../../assets/images/dist.png" alt="">
            </template>
            <template v-slot:btn="listInfo">
              <button class="topListPlay" :class="{'showButton':listInfo.currentId==listInfo.id}"><i class="iconfont icon-bofang"></i></button>
            </template>
          </MusicList>
        </div>
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
import MusicList from '../../../components/FindMusic/MusicList.vue'
import SelectSinger from '../../../components/FindMusic/SelectSinger.vue'
import NewMusicOption from '../../../components/FindMusic/NewMusic/NewMusicOption.vue'
export default {
  name: 'NewDiscList',
  data(){
    return {
      currentSelect: '推荐',
      cateType: {
        'ALL': '全部',
        'ZH': '华语',
        'EA': '欧美',
        'JP': '日本',
        'KR': '韩国'
      },
      selectType: [
        {'hot': '推荐'},
        {'new': '全部'}
      ],
      weekDistList: [],
      monthDistList: [],
      currentType: 'hot',
      currentArea: 'ALL',
      offset: 0,
      currentYear: '2021',
      limit: 30,
      currentMonth: new Date().getMonth()+1,
      loading: false
    }
  },
  components: {
    NewMusicOption,
    SelectSinger,
    MusicList
  },
  methods: {
    async getNewList(){
      this.loading = true
      const {data:res} = await this.$request('/top/album', {
        params: {
          area: this.currentArea,
          offset: this.offset,
          limit: this.limit,
          year: this.currentYear,
          month: this.currentMonth,
          type: this.currentType
        }
      })
      
      this.weekDistList = []
      if(this.currentType=='hot'&&this.currentArea=='ALL'){
        this.weekDistList = res.weekData
      }
      this.monthDistList = res.monthData.slice(0,50)
      this.loading = false
    },
    changeCurrentType(type){
      this.currentType = type
      this.getList()
    },
    async getList(){
      this.loading = true
      if(this.currentType=='new'){
        
        const {data:res} = await this.$request('/album/new', {
          params: {
            limit: this.limit,
            offset: this.offset,
            area: this.currentArea
          }
        })
        this.weekDistList = []
        this.monthDistList = res.albums
        this.loading = false
      } else { 
        this.getNewList() 
      }
    },
    changeCurrentArea(newArea){
      this.currentArea = newArea
      this.getList()
    }
  },
  mounted(){
    this.getNewList()
  }
}
</script>

<style lang="less" scoped>
  .newDiscListContainer{
    .distTitle{
      width: 40px;
      font-size: 20px;
      span{
        font-weight: 0;
        font-size: 14px;
      }
    }
    .monthDistTitle{
      width: 40px;
      font-size: 30px;
      font-weight: bold;
    }
    .distList{
      display: flex;
      .dist{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .weekDistItem{
          .img{
            width: 80px;
            height: 80px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .discImg{
      position: absolute;
      width: calc(100%+20+'px');
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 10px;
    }
  }
</style>