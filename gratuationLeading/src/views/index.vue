<template>
  <div class="index">
    <el-container class="index-content">
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <CesiumMap v-if="route.path === '/showInfoMain/three' ? false : true" />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/views/Header/index.vue'
import CesiumMap from '@/views/showInfoMain/cesium.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
}
.index-content {
  width: 100%;
  height: 100%;

  .el-header {
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    line-height: 200px;
    cursor: pointer;
    background-color: #001529;

    // 删除滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #f0f2f5;
    --el-main-padding: 0px;
  }
}
</style>
