<template>
  <el-menu
    :collapse="isStatus"
    :default-active="defaultActive"
    text-color="#b7bdc3"
    active-text-color="#fff"
    background-color="#001529"
  >
    <!-- 遍历整个菜单 -->
    <template v-for="item in menuList" :key="item.id">
      <el-sub-menu :index="item.id + ''">
        <template #title>
          <!-- 字符串转成组件，利用component动态组件 -->
          <el-icon>
            <component :is="item.icon.split('el-icon-')[1]" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <div v-for="childItem in item.children" :key="childItem.id">
          <el-menu-item :index="childItem.id + ''" @click="handleItemClick(childItem)">
            <el-icon>
              <component :is="childItem.icon.split('el-icon-')[1]" />
            </el-icon>
            {{ childItem.name }}</el-menu-item
          >
        </div>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/mapMenus'
import useLoginStore from '@/stores/login'

type Props = {
  isStatus: boolean
}

defineProps<Props>()
const router = useRouter()
const loginStore = useLoginStore()
const menuList = loginStore.menuList

const handleItemClick = (item: any) => {
  const url = item.path
  router.push(url)
}

// 进入main中的默认菜单
const defaultActive = computed(() => {
  const currentMenu = mapPathToMenu(router.currentRoute.value.fullPath, menuList)
  return currentMenu.id + ''
})
</script>

<style lang="less" scoped>
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
