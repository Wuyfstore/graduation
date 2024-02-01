import { ref } from 'vue'
import type pageModal from '@/components/pageModal.vue'

const usePageModal = () => {
  const modalRef = ref<InstanceType<typeof pageModal>>()

  // 点击content，modal的从操作
  const handleNewClick = () => {
    modalRef.value?.setDialogVisible()
  }
  const handleEidtClick = (info: any) => {
    modalRef.value?.setDialogVisible(false, info)
  }

  return { modalRef, handleNewClick, handleEidtClick }
}

export default usePageModal
