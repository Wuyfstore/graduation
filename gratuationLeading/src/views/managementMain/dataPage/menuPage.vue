<template>
  <div class="menuPage">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEidtClick"
    />
    <pageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/pageSearch.vue'
import pageContent from '@/components/pageContent.vue'
import pageModal from '@/components/pageModal.vue'

import searchConfig from '@/config/searchConfig/menuSearch.config'
import contentConfig from '@/config/contentConfig/menuContent.config'
import modalConfig from '@/config/modalConfig/menuModal.config'

import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

// 利用hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewClick, handleEidtClick } = usePageModal()
</script>

<style lang="less" scoped></style>
