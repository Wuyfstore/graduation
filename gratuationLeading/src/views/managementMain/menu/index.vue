<template>
  <div class="main-menu">
    <!-- title -->
    <div class="main-title">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!status">数据管理模块</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <MenuItem :isStatus="status" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from './menuItem.vue'

type Props = {
  status: boolean
}
// 定义props
defineProps<Props>()
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.main-title {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
