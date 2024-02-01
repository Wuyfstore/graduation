import { defineStore } from 'pinia'
import type { cesiumStore } from '@/types/StoreTypes'

const useCesiumStore = defineStore('cesium', {
  state: (): cesiumStore => ({
    isFlyTo: true,
    defaultPointId: 39,
    defaultCheckedBox: ['P0'],
    defaultChecked: [['P0']],
    Entites: []
  }),
  actions: {
    // 改变ifFlyTo的值
    changeIsFlyTo() {
      this.isFlyTo = !this.isFlyTo
    },
    // 保存点击的entity id
    saveClickEntityId(id: number) {
      this.defaultPointId = id
    },
    // 添加选中的keys
    changeDefaultCheckedNodeKeys(keys: Array<string | number>) {
      this.defaultCheckedBox = keys
    },
    // 添加选中的nodes
    changeDefaultCheckedNodes(nodes: Array<[string | number]>) {
      this.defaultChecked = nodes
    },
    // 将操作中id值保存下来
    saveEntitesId(id: number | string) {
      this.Entites.push(id)
    }
  }
})

export default useCesiumStore
