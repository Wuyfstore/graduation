<template>
  <div class="header">
    <div class="menu-icon" @click="handleFoldClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerCrumb />
      <switchModal />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import headerCrumb from './headerCrumb.vue'
import switchModal from '@/components/switchModal.vue'

// 自定义事件
const emit = defineEmits(['foldChange'])

//记录状态
const isFold = ref<boolean>(false)

const handleFoldClick = () => {
  isFold.value = !isFold.value
  // 将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
