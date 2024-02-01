import { createPinia } from 'pinia'
import useLoginStore from '@/stores/login'
import type { App } from 'vue'

const pinia = createPinia()

const registStore = (app: App<Element>) => {
  app.use(pinia)
  // 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheActionWhileRefresh()
}

export default registStore
