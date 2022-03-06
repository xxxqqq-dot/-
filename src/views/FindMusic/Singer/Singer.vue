<template>
  <div class="Singercontainer">
      <SelectSinger v-for="(item,index) in selectType" :key="index" :activeType="item.typeName[0][-1]" 
        :selectType="item.typeName" :name="item.name"
        @changeType="changeCurrentType"/>
    <div class="singerList" v-show="!loading">
      <div class="singerItem" v-for="item in singerList" :key="item.id" @click="toSingerDetail(item)">
        <img src="../../../assets/images/loading.jpeg" v-lazyLoading="item.picUrl" alt="">
        <div class="name">{{item.name}}</div>
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
import {mixin} from '../../../plugins/mixin'
import SelectSinger from '../../../components/FindMusic/SelectSinger.vue'
import MusicList from '../../../components/FindMusic/MusicList'
export default {
  name: 'Singer',
  data(){
    return {
      selectType: [
        {
          name: '语种',
          typeName: [ {'-1': '全部'}, {'7': '华语'}, {'96': '欧美'}, {'8': '日本'}, {'16': '韩国'}, {'0': '其他'} ],
          currentType: '-1'
        },
        {
          name: '分类',
          typeName: [ {'-1': '全部'}, {'1': '男歌手'}, {'2': '女歌手'}, {'3': '乐队组合'} ],
          currentType: '-1'
        },
        {
          name: '筛选',
          typeName: [
            {"-1":" 热门"}, {"A": "A"}, {"B": "B"}, {"C": "C"}, {"D": "D"}, {"E": "E"}, {"F": "F"}, {"G": "G"}, {"H": "H"}, {"I": "I"}, {"J": "J"}, {"K": "K"}, {"L": "L"}, {"M": "M"}, 
            {"N":"N"}, {"O": "O"}, {"P": "P"}, {"Q": "Q"}, {"R": "R"}, {"S": "S"}, {"T": "T"}, {"U": "U"}, {"V": "V"}, {"W": "W"}, {"X": "X"}, {"Y": "Y"}, {"Z": "Z"}, {"0": "#"}
          ],
          currentType: '-1'
        }
      ],
      singerList: [],
      loading: false
    }
  },
  components: {
    SelectSinger,
    MusicList
  },
  mixins: [mixin],
  methods: {
    changeCurrentType(index,item){
      this.selectType.some( i => {
        i.typeName===item && (i.currentType = index)
        return i.typeName===item && (i.currentType = index)
      })
      this.getSinger()
    },
    async getSinger(){
      this.loading = true
      const {data} = await this.$request('/artist/list',{
        params: {
          area: this.selectType[0].currentType,
          type:this.selectType[1].currentType,
          initial: this.selectType[2].currentType
        }
      })
      this.singerList = data.artists
      this.loading = false
    },
  },
  mounted(){
    this.getSinger()
  }
}
</script>

<style lang="less" scoped>
  .Singercontainer{
    margin-top: 70px;
    .singerList{
      display: flex;
      flex-wrap: wrap;
      .singerItem{
        width: 14%;
        // height: 100%;
        margin-right: 20px;
        margin-bottom: 30px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .name{
          height: 20px;
          font-size: 12px;
        }
      }
    }
  }
</style>