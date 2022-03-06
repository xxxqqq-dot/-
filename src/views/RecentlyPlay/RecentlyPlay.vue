<template>
  <div class="recentlyPlayContainer">
    <h1 class="recentlyPlayTitle">最近播放<span>共{{recentlyPlayList.length}}首</span></h1>
    <el-table :data="recentlyPlayList" stripe @row-dblclick="playSong">
      <el-table-column type="index" width="50">
          <template slot-scope="scope">
            <span>{{recentlyPlayList.indexOf(scope.row)+1}}</span>
          </template>
        </el-table-column>
      <el-table-column prop="name" label="标题">

      </el-table-column>
      <el-table-column prop="ar" label="歌手">
        <template slot-scope="scope">
          <span v-for="item in scope.row.ar" :key="item.id">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="播放时间">
        <template slot-scope="scope">
          <span>{{scope.row.dt}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import SongList from '../../components/MusicDetail/SongList'
export default {
  name: 'RecentlyPlay',
  components: {
    // SongList
  },
  computed: {
    ...mapState(['recentlyPlayList'])
  },
  methods: {
    playSong(musicInfo){
      this.$bus.$emit('play',musicInfo)
    }
  }
}
</script>

<style lang="less" scoped>
  .recentlyPlayContainer{
    .recentlyPlayTitle{
      margin: 10px 0;
      font-size: 20px;
      span{
        font-size: 14px;
        font-weight: normal;
        color: #9f9f9f;
        margin-left: 10px;
      }
    }
  }

</style>