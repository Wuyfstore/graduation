<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login'
import { mapPathToBreadCrumbs } from '@/utils/mapMenus'

const route = useRoute()
const menuList = useLoginStore().menuList

const breadCrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, menuList)
})
</script>

<style lang="less" scoped></style>
