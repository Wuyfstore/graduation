import { defineStore } from 'pinia'
import { UserStore } from '@/types/StoreTypes'
import { addData, getAllDatas, updateData, deleteData } from '@/server/https'

const useDataStore = defineStore('data', {
  state: (): UserStore => ({
    dataList: [],
    dataCount: 0
  }),
  actions: {
    // 获取所有数据
    async postAllDatas(pageName: string, path: string = '', query: any = '') {
      const usersListRes = await getAllDatas(pageName, path, query)
      this.dataList = usersListRes.data
      this.dataCount = usersListRes.count
    },

    // 获取某一个数据
    async getTarData(pageName: string, info: any) {
      const target = await getAllDatas(pageName, info)
      this.dataCount = target.count
      this.dataList = target.data
    },

    // 删除某个数据
    async deleteTargetData(pageName: string, info: number | string) {
      // 删除数据
      await deleteData(pageName, info)
      // 重新请求数据
      this.postAllDatas(pageName)
    },

    // 新建一个数据
    async newData(pageName: string, value: any) {
      await addData(pageName, value)
      // 重新请求数据
      setTimeout(() => {
        this.postAllDatas(pageName)
      }, 1000)
    },

    // 更新数据
    async updateTargetData(pageName: string, info: number | string, value: any) {
      await updateData(pageName, info, value)
      // 重新请求数据
      this.postAllDatas(pageName)
    }
  }
})

export default useDataStore
