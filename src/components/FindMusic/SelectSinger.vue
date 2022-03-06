<template>
  <div class="selectSinger">
    <div class="title" v-if="name">{{name}}：</div>
    <div class="selectType">
      <div class="selectTypeItem" v-for="(item,index) in selectType" :key="index">
        <span class="name" v-for="(value,key) in item" :key="key" :class="value==currentType?'activeClass':''"
          @click="sendIndex(key,selectType,value)">{{value}}</span>
        <span class="line">|</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectSinger',
  data(){
    return {
      currentType: ''
    }
  },
  props: ['selectType','name', 'activeType'],
  methods: {
    sendIndex(key,selectType,value){
      this.currentType = value
      this.$emit('changeType',key,selectType)
      console.log('000',key)
    }
  },
  mounted(){
    this.currentType = this.activeType
  }
}
</script>

<style lang="less" scoped>
  .selectSinger{
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      font-size: 12px;
      color: #676767;
      text-align: center;
      .title{
        margin-right: 20px;
      }
      .selectType{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        .selectTypeItem{
          display: flex;
          .name{
            box-sizing: content-box;
            cursor: pointer;
            width: 50px;
            height: 100%;
            line-height: 20px;
            padding: 0 5px;
          }
          .name:hover{
            color: #000;
          }
        }
      }
      .selectTypeItem:last-child .line{
        display: none;
      }
    }
</style>