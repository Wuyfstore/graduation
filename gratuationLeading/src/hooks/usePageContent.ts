import { ref } from 'vue'
import type pageContent from '@/components/pageContent.vue'

const usePageContent = () => {
  const contentRef = ref<InstanceType<typeof pageContent>>()

  // 点击搜索，content中的操作
  const handleQueryClick = (queryInfo: any) => {
    console.log(queryInfo.username, queryInfo)
    // contentRef.value?.fetchPageListData(queryInfo.username ?? queryInfo)
    contentRef.value?.fetchPageListData('query', queryInfo)
  }

  // 点击重置后，content中的操作
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
