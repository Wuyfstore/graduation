<template>
  <div class="headerInfo">
    <div class="modealSelect">
      <el-dropdown>
        <el-button type="info">模式选择</el-button>
        <template #dropdown>
          <el-dropdown-item @click="handleToShowData">
            <el-icon><Monitor /></el-icon>
            <span>信息展示</span>
          </el-dropdown-item>
          <el-dropdown-item @click="handelToManager" divided>
            <el-icon><DataBoard /></el-icon>
            <span>信息管理</span>
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleToShowData = () => {
  const currentPath = router.currentRoute.value.fullPath
  const path = currentPath.substring(0, currentPath.indexOf('/', 1))
  if (path === '/showInfoMain') return
  router.push('/showInfoMain')
}

const handelToManager = () => {
  const currentPath = router.currentRoute.value.fullPath
  const path = currentPath.substring(0, currentPath.indexOf('/', 1))
  if (path === '/managementMain') return
  router.push('/managementMain/System')
}
</script>

<style lang="less" scoped>
.headerInfo {
  display: flex;
  align-items: center;
}

.info {
  .userInfo {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  // 全局修改
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  // 解释为什么不用:deep(),因为这个样式在app外面,无法用deep拿到
}
</style>
