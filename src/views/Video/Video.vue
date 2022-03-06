<template>
  <div class="videoContainer">
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/Home/Video/RelevantVideo">视频</el-menu-item>
      <el-menu-item index="/Home/Video/RevelantMV">MV</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>