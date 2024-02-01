<template>
  <div class="engPage">
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

import searchConfig from '@/config/searchConfig/engSearch.config'
import contentConfig from '@/config/contentConfig/engContent.config'
import modalConfig from '@/config/modalConfig/engModal.config'

import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

// 利用hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewClick, handleEidtClick } = usePageModal()
</script>

<style lang="less" scoped></style>
