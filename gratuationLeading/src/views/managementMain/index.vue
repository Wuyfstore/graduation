<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="iscollapse ? '60px' : '210px'">
        <Menu :status="iscollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <Header @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Menu from '@/views/managementMain/menu/index.vue'
import Header from '@/views/managementMain/header/index.vue'

// 处理main-header中折叠的变化
const iscollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  console.log(isFold)
  iscollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /*firefox*/
    -ms-overflow-style: none; /*IE 10+*/

    // 删除滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
    --el-main-padding: 20px;
  }
}
</style>
