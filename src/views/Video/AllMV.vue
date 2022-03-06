<template>
  <div class="allMVContainer">
    <div class="allMV">
      <h1 class="cateTitle">全部MV ></h1>
      <SelectSinger v-for="(item,index) in selectType" :key="index" :activeType="item.typeName[0]['全部']||item.typeName[0]['上升最快']"
        :selectType="item.typeName" :name="item.name"
        @changeType="changeCurrentType"/>
    </div>
    <div class="mvList">
      <div class="mvItem" v-for="item in mvList" :key="item.id">
        <VideoList :videoInfo="item" type="mv"/>
      </div>
    </div>
  </div>
</template>

<script>
import VideoList from '../../components/Video/VideoList'
import SelectSinger from '../../components/FindMusic/SelectSinger.vue'
export default {
  name: 'AllMV',
  data(){
    return {
      mvList: [],
      selectType: [
        {
          name: '地区',
          typeName: [ {'全部': '全部'}, {'内地': '内地'}, {'港台': '港台'}, {'日本': '日本'}, {'韩国': '韩国'} ],
          currentType: '全部'
        },
        {
          name: '类型',
          typeName: [ {'全部': '全部'}, {'官方版': '官方版'}, {'原声': '原声'}, {'现场版': '现场版'}, {'网易出品': '网易出品'} ],
          currentType: '全部'
        },
        {
          name: '排序',
          typeName: [ {"上升最快":" 上升最快"}, {"最热": "最热"}, {"最新": "最新"} ],
          currentType: '上升最快'
        }
      ]
    }
  },
  components: {
    SelectSinger,
    VideoList
  },
  methods: {
    async getMVList(){
      const {data: res} = await this.$request('/mv/all', {
        params: {
          area: this.selectType[0].currentType,
          type: this.selectType[1].currentType,
          order: this.selectType[2].currentType,
        }
      })
      this.mvList = res.data
    },
    changeCurrentType(index,item){
      this.selectType.some( i => {
        i.typeName===item && (i.currentType = index)
        return i.typeName===item && (i.currentType = index)
      })
      this.getMVList()
    }
  },
  mounted(){
    this.getMVList()
  }
}
</script>

<style lang="less" scoped>
  .allMVContainer{
    .allMV{
      .cateTitle{
        margin: 10px 0;
      }
      .mvCate{
        display: flex;
        margin: 10px;
        .title{
          width: 40px;
          font-size: 12px;
        }
        .item{
          // width: 50px;
          font-size: 12px;
          text-align: center;
          padding: 0 5px;
          margin: 0 10px;
        }
      }
    }
    .mvList{
      display: flex;
      flex-wrap: wrap;
      .mvItem{
        width: 33%;
      }
    }
  }
</style>