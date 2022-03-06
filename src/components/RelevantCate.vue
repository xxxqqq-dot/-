<template>
  <div class="relevantCate">
    <div class="tags">
      <button class="btn" @click="showTag()">
        {{currentTag}}
        <span class="iconfont icon-you"></span>
      </button>
      <div class="hotTags">
        <span v-for="item in hotTags" :key="item.id" 
          @click="changeCurrentTag(item.name,item.id)" class="hotTagName" 
          :class="item.name==currentTag?'activeClass':''"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="selectTag" v-show="isSelectTag">
      <slot>
        <div class="allTag" v-if="tags.all" @click="showTag(tags.all.name)">
          <span style="padding:5px 10px" :class="tags.all.name==currentTag?'activeClass':''">{{tags.all.name}}</span>
        </div>
        <div class="allTags">
          <div class="category" v-for="(value,key) in tags.categories" :key="value">
            <span class="iconfont" :class="relevantIcon[key]">
              <span class="cateName">{{value}}</span>
            </span>
            <div class="cateTitle" v-if="cateTag[key]">
              <span class="cateTag" :class="item.name==currentTag?'activeClass':''" 
              v-for="(item,index) in cateTag[key]" :key="index" 
              @click="showTag(item.name)"
            >{{item.name}}</span>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelevantCate',
  data() {
    return {
      // isSelectTag: false
    }
  },
  props: ['currentTag', 'hotTags', 'tags', 'cateTag', 'relevantIcon', 'isSelectTag'],
  methods: {
    changeCurrentTag(value,id){
      this.$emit('changeCurrentTag', value,id)
    },
    showTag(value){
      console.log('lll',this.isSelectTag)
      this.$emit('showTag', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .relevantCate{
    position: relative;
    margin-top: 10px;
    .tags{
      display: flex;
      justify-content: space-between;
      .btn{
        border: 1px solid #d8d8d8;
      }
      .hotTags{
        span{
          // margin-right: 10px;
          color: #676767;
          font-size: 12px;
          cursor: default;
          padding: 3px 10px;
        }
        span:hover{
          color: #373737;
        }
      }
    }
    .selectTag{
      position: absolute;
      top: 35px;
      background-color: #fff;
      color: #cfcfcf;
      border-radius: 5px;
      box-shadow: -1px -1px 10px -2px #cfcfcf;
      z-index: 3;
      .allTag{
        // width: 900px;
        height: 60px;
        line-height: 60px;
        padding-left: 15px;
        color: #373737;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 10px;
      }
      .allTags{
        width: 900px;
        padding-bottom: 100px;
      }
      .allTag:hover{
        color: #ec4141;
      }
      .category{
        display: flex;
        // justify-content: space-between;
        // align-items: center;
        color: #999999;
        padding-left: 15px;
        margin-bottom: 20px;
        .iconfont{
          display: flex;
          align-items: center;
          height: 30px;
          width: 80px;
          // border: 1px solid #000;
          line-height: 30px;
          font-size: 20px;
          .cateName{
            font-size: 14px;
            padding-left: 5px;
          }
        }
        .cateTitle{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .cateTag{
            width: 120px;
            height: 30px;
            line-height: 30px;
            color: #373737;
            font-size: 14px;
            text-align: center;
            cursor: default;
          }
          .cateTag:hover{
            color: #ec4141;
          }
        }
        
      }
    }
  }
</style>