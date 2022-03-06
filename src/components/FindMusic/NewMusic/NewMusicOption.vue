<template>
  <div class="options">
    <div class="cateType">
      <span v-for="(value,key) in cateType" :key="key" 
        :class="currentType==value?'activeType':''" @click="getNewList(key,value)">
        {{value}}
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NewMusicOption',
  data(){
    return {
      currentType: '全部'
    }
  },
  props: ['cateType'],
  methods: {
    getNewList(key,value){
      this.currentType = value
      console.log(value)
      this.$emit('getNewList',key)
    }
  }
}
</script>

<style lang="less" scoped>
  .options{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .cateType{
      display: flex;
      align-items: center;
      span{
        margin-right: 25px;
        color: #676767;
        font-size: 14px;
        cursor: pointer;
      }
      span:hover{
        color: #000;
      }
    }
  }
  .activeType{
    color: #000!important;
    font-weight: bold;
  }
</style>