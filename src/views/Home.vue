<template>
  <div class="homeContainer" @click="closeSearchVisible">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="title">
                <img src="../assets/images/demo.svg" alt="">
                <span>网易云音乐</span>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple-light">
              <div class="back">
                <button @click="skip(-1)">
                  <i class="iconfont icon-zuo"></i>
                </button>
                <button @click="skip(1)">
                  <i class="iconfont icon-you"></i>
                </button>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <div class="search">
                <button>
                  <i class="iconfont icon-sousuo"></i>
                </button>
                <input type="text" ref="ipt" @focus="searchVisible=true" :placeholder="keyword" v-model="searchValue">
                <div class="showHotSearch" v-show="searchVisible" @mouseover="isClose = true" @mouseleave="isClose = false">
                  <div class="showSearch" v-show="!searchValue">
                    <div class="historySearch" v-show="historySearchList.length">
                      <div class="historyTitle">
                        历史搜索<span class="iconfont icon-shanchu" @click="clearHistorySearch"></span>
                        <div class="historySearchList">
                          <div class="historySearchItem" v-for="(item) in historySearchList" :key="item">
                            {{item}}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="hotSearchList">
                      <div class="hotSearchTitle">热搜榜</div>
                      <div class="hotSearchItem" v-for="(item,index) in hotSearch" 
                        :key="item.searchWord" @click="getSearchList(item.searchWord)">
                        <div class="index">{{index+1}}</div>
                        <div class="hotSearchDeatil">
                          {{item.searchWord}}
                          <img v-if="item.iconUrl" :src="item.iconUrl" alt="">
                          <span>{{item.score}}</span>
                          <div class="searchContent">{{item.content}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="showSearchContent" v-show="searchValue">
                    <div class="searchContentTitle">搜索"<span style="color: blue;">{{searchValue}}</span>"相关的结果 ></div>
                    <div class="relevantMusic">
                      <div class="relevantMusicTitle">
                        <span class="iconfont icon-yinle"></span>单曲
                      </div>
                      <div class="relevantMusicItem" v-for="item in matchSearchSongs" 
                        :key="item.id" v-html="item.name+'-'+item.artists[0].name"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div v-if="!userInfo" class="userInfo" @click="toLogin">
                <img src="../assets/images/user.webp" alt="">
                <span>未登录</span>
              </div>
              <div v-else class="userInfo">
                <img :src="userInfo.profile.avatarUrl" alt="">
                <span>{{userInfo.profile.nickname}}</span>
                <button @click="logout">退出</button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu router :default-active="activeIndex" @select="handleSelect">
            <el-menu-item index="/Home/FindMusic">发现音乐</el-menu-item>
            <el-menu-item index="/Home/Video">视频</el-menu-item>
            <el-menu-item-group>
              <template slot="title">我的音乐</template>
              <el-menu-item index="/Home/RecentlyPlay">最近播放</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">创建的歌单</template>
              <el-menu-item index="/Home/LikeSong">我喜欢的音乐</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="/Home" v-if="collectSongList.length">
              <template slot="title">
                <span>收藏的歌单</span>
              </template>
              <el-menu-item-group>
                <div class="collectMusic" v-for="item in collectSongList" :key="item.id" @click="detailMusicList('music',item.id)" >{{item.name}}</div>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
      <Footer @closeDrawer="closeDrawer"/>
      <div class="musicListTable">
        <el-drawer title="当前播放" :visible.sync="musicListTable" direction="rtl"
          size="30%" :modal="false"
        > 
          <div class="playListInfo">
            <div class="count">总{{currentPlayList.length}}首</div>
            <div class="options">
              <div class="collect"><span class="iconfont icon-folder-add">收藏全部</span></div>
              <div class="clearAll">清空列表</div>
            </div>
          </div>
          <el-table :data="currentPlayList" @row-dblclick="playSong">
            <el-table-column prop="name" label="标题" width="200">
              <template slot-scope="scope">
                <span :class="scope.row.isCurrentPlay?'playClass':''">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ar" label="歌手">
              <template slot-scope="scope">
                <span :class="scope.row.isCurrentPlay?'playClass':''" v-for="item in scope.row.ar" :key="item.id">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dt" label="时间" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.dt | detailTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>
      </div>
    </el-container>
  </div>
</template>

<script>
import Footer from '../components/Footer/Footer'
import {mapState} from 'vuex'
import {mixin} from '../plugins/mixin'
export default {
  name: 'Home',
  data(){
    return {
      userInfo: window.localStorage.getItem('loginInfo')?JSON.parse(window.localStorage.getItem('loginInfo')):'',
      musicListTable: false,
      activeIndex: '',
      keyword: '',
      searchVisible: false,
      hotSearch: [],
      isClose: false,
      historySearchList: [],
      searchValue: '',
      matchSearch: {},
      matchSearchSongs: []
    }
  },
  components: {
    Footer
  },
  methods: {
    toLogin(){
      this.$router.push({
        path: '/Login'
      })
    },
    logout(){
      window.localStorage.removeItem('loginInfo')
      this.userInfo = ''
      this.$router.go(0)
    },
    closeDrawer(value){
      this.musicListTable = value
    },
    handleSelect(key, keyPath){
      window.sessionStorage.setItem('activePath', keyPath[0])
      this.activeIndex = keyPath[0]
    },
    playSong(row){
      this.playMusic(row)
    },
    skip(val){
      this.$router.go(val)
    },
    async getKeyWord(){
      const {data:res} = await this.$request('/search/default')
      this.keyword = res.data.realkeyword
    },
    async getHotSearch(){
      const {data:res} = await this.$request('/search/hot/detail')
      this.hotSearch = res.data
    },
    closeSearchVisible(e){
      if(this.isClose||e.target == this.$refs.ipt) return
      this.searchVisible = false
    },
    async getSearchList(keywords){
      const {data} = await this.$request('/search/suggest', {
        params: {
          keywords
        }
      })
      this.searchValue = keywords
      this.changeHistorySearchList(keywords)
      this.matchSearch = data.result
      let searchReg = new RegExp(keywords,'ig')
      this.matchSearchSongs = this.matchSearch.songs.map(item => {
        item.name = item.name.replace(searchReg, `<span style="color: blue;">$&</span>`)
        return item
      })
    },
    changeHistorySearchList(keywords){
      let currentIndex = 0
      let isExit = this.historySearchList.some((item,index) => {
        item == keywords&&(currentIndex = index)
        return item == keywords
      })
      if(isExit){
        this.historySearchList.splice(currentIndex,1)
      }
      this.historySearchList.unshift(keywords)
    },
    clearHistorySearch(){
      this.historySearchList = []
    }
    
  },
  computed: {
    ...mapState(['isMusicPlay', 'currentPlayList', 'collectSongList'])
  },
  mixins: [mixin],
  mounted(){
    this.activeIndex = window.sessionStorage.getItem('activePath')?window.sessionStorage.getItem('activePath'):'/Home/FindMusic'
    this.getKeyWord()
    this.getHotSearch()
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    min-width: 700px;
    z-index: 11;
    position: fixed;
    top: 0;
    background-color: #ec4141;
    width: 100%;
    height: 60px;
    line-height: 60px;
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      button{
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, .1);
        border: 0;
        border-radius: 50%;
        margin-right: 5px;
        i{
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #fff;
        }
      }
    .search{
      position: relative;
      height: 100%;
      button{
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        background-color: transparent;
      }
      input{
        width: 200px;
        height: 30px;
        border: 0;
        border-radius: 15px;
        outline: none;
        background-color: rgba(0, 0, 0, .1);
        padding: 0 30px;
        color: #fff;
      }
      .showHotSearch{
        position: absolute;
        top: 50px;
        width: 400px;
        height: 450px;
        background-color: #fff;
        overflow: auto;
        line-height: normal;
        border-radius: 5px;
        box-shadow: -1px -1px 10px -2px #cfcfcf;
        .showSearch{
          .hotSearchTitle,.historySearch{
            color: #c3c3c3;
            font-size: 14px;
            margin: 10px;
            padding-left: 10px;
            span{
              margin-left: 10px;
              color: #000;
            }
            .historySearchList{
              display: flex;
              flex-wrap: wrap;
              .historySearchItem{
                height: 20px;
                padding: 0 10px;
                color: #000;
                font-size: 12px;
                margin-top: 10px;
                margin-right: 10px;
                border: 1px solid #dbdbdb;
                border-radius: 10px;
              }
            }
          }
          .hotSearchList{
            .hotSearchItem{
              height: 60px;
              display: flex;
              align-items: center;
              cursor: pointer;
              .index{
                margin: 0 20px;
                color: #cccccc;
              }
              .hotSearchDeatil{
                color: #000;
                font-weight: bold;
                font-size: 12px;
                span{
                  font-size: 10px;
                  color: #c3c3c3;
                  margin-left: 10px;
                }
                .searchContent{
                  color: #c3c3c3;
                  font-weight: normal;
                  margin-top: 5px;
                }
              }
            }
            .hotSearchItem:hover{
              background-color: #f2f2f2;
            }
            img{
              width: auto;
              height: 10px;
              margin-left: 10px;
            }
          }
        }
        .showSearchContent{
          font-size: 12px;
          color: #676767;
          .searchContentTitle{
            padding:10px 0 10px 10px;
          }
          .relevantMusic{
            .relevantMusicTitle{
              height: 25px;
              line-height: 25px;
              background-color: #f5f5f7;
              padding-left: 10px;
            }
            .relevantMusicItem{
              padding-left: 20px;
              height: 25px;
              line-height: 25px;
              cursor: pointer;
            }
            .relevantMusicItem:hover{
              background-color: #f2f2f2;
            }
          }
        }
      }
      .showHotSearch::-webkit-scrollbar{
        display:none;
      }
    }
    .title,.userInfo{
      display: flex;
      height: 100%;
      align-items: center;
      flex-wrap: nowrap;
      span{
        color: #fff;
      }
    }
    .userInfo{
      // float: right;
      width: 300px;
      height: 60px;
      color: #eee;
      z-index: 1;
      button{
        width: 50px;
        height: 30px;
        border-radius: 10px;
        margin-left: 10px;
        color: #fff;
      }
      span{
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .el-row,.el-col{
      height: 100%!important;
    }
    
  }
  .el-aside{
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 80px;
    z-index: 12;
    background-color: #fff;
    .collectMusic{
      width: 100%;
      height: 50px;
      line-height: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .el-aside::-webkit-scrollbar{
    display:none;
  }
  .el-main{
    margin: 60px 0 80px 180px;
    overflow: hidden;
  }
  .playListInfo{
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    .count{
      font-size: 12px;
      color: #cccccc;
    }
    .options{
      display: flex;
      justify-content: center;
      font-size: 14px;
      .collect{
        margin-right: 10px;
        span{
          font-size: 14px;
        }
      }
      .clearAll{
        color: #6c92bc;
      }
    }
  }
  .musicListTable{
    .drawerFooter{
      width: 100%;
      height: 80px;
    }
    .drawerTitle{
      height: 80px;
    }
    .el-drawer__wrapper{
      z-index: 9999!important;
    }
    .el-table{
      font-size: 12px;
    }
  }
  
</style>