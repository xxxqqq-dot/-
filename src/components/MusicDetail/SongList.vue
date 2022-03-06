<template>
  <div class="songListContainer">
    <template>
      <el-table :data="playlist" stripe style="width: 100%" @row-dblclick="playSong">
        <el-table-column type="index" width="50">
          <template slot-scope="scope">
            <span v-if="!scope.row.isCurrentPlay">{{playlist.indexOf(scope.row)+1}}</span>
            <span v-else class="iconfont icon-shengyinyoushengyin playClass"></span>
          </template>
        </el-table-column>
        <slot name="option">
          <el-table-column prop="isLike" label="操作" width="80">
            <template slot-scope="scope">
              <button class="status" @click="addLike(scope.row,scope.row.id)">
                <span v-if="scope.row.islike" class="like iconfont icon-xihuan1"></span>
                <span v-else class="notlike iconfont icon-xihuan"></span>
              </button>
              <button class="doneload"><span class="iconfont icon-xiazai1"></span></button>
            </template>
          </el-table-column>
        </slot>
        <el-table-column prop="name" label="标题" width="420">
          <template slot-scope="scope">
            <slot name="title" :musicTitle="scope.row">
              
            </slot>
            <span :class="scope.row.isCurrentPlay?'playClass':''" v-html="scope.row.name"></span>
          </template>
        </el-table-column>
        <el-table-column label="歌手">
          <template slot-scope="scope">
            <slot name="singerName" :songInfo="scope.row">
              <div class="arName" v-if="scope.row.ar">
                <span v-for="(item,index) in scope.row.ar" :key="index" @click="toSingerDetail(item)">{{item.name}}</span>
              </div>
            </slot>
          </template>
        </el-table-column>
        <el-table-column label="专辑">
          <template slot-scope="scope">
            <slot name="album" :album="scope.row">
              <span v-if="scope.row.ar" @click="detailMusicList('album',scope.row.al.id)">{{scope.row.al.name}}</span>
            </slot>
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时间" width="80">
          <template slot-scope="scope">
            <slot name="timer" :timer="scope.row">
              <span>{{scope.row.dt | detailTime}}</span>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mixin} from '../../plugins/mixin'
export default {
  name: 'SongList',
  data(){
    return {
      show: true
    }
  },
  // props: ['playlist'],
  computed: {
    ...mapState(['likeId', 'playlist'])
  },
  methods: {
    addLike(musicInfo,id){
      this.$store.commit('SAVELIKId',id)
      this.$store.commit('SHOWISLIKE')
      this.$store.dispatch('saveLikeMusic',musicInfo)
    },
    playSong(row){
      this.playMusic(row,this.playlist)
      console.log('opop',this.playlist)
    }
  },
  mixins: [mixin],
}
</script>

<style lang="less" scoped>
  button{
    background-color: transparent;
    border: 0;
    margin-left: 5px;
    .like{
      color: #ec4141;
    }
  }
  .arName{
    span:after{
      content: ' / ';
      cursor: default;
    }
    span:last-child:after{
      content: '';
    }
    span{
      cursor: pointer;
    }
  }
</style>