import { defineStore } from 'pinia'
import { getAllDatas } from '@/server/https'
import type { HTType } from '@/types/Props'
import type { HoleStore } from '@/types/StoreTypes'

const useHoleStore = defineStore('hol1e', {
  state: (): HoleStore => ({
    tarRockList: {} as HTType,
    rockList: {} as HTType,
    histogramList: [],
    ageCount: 0,
    histogramTypeCount: 0,
    engTypeCount: 0,
    holeCount: 0,
    holeTypeCount: 0
  }),
  actions: {
    async getTarHistogramData(id: number) {
      const data = await getAllDatas('/ntproject', id)
      this.tarRockList = data
      this.getColorTotarRockList()
      console.log(data)
    },
    async getrockListData(id: number) {
      const data = await getAllDatas('/ntproject', id)
      this.rockList = data
      this.getColorTotarRockList()
    },
    async getHistogramData() {
      const data = await getAllDatas('/histogram')
      this.histogramList = data.data
    },
    async getAllCount() {
      const age = await getAllDatas('/age')
      const histogram = await getAllDatas('/histogram')
      const eng = await getAllDatas('/eng')
      const hole = await getAllDatas('/ntproject')
      const holetype = await getAllDatas('/holetype')
      this.ageCount = age.count
      this.histogramTypeCount = histogram.count
      this.engTypeCount = eng.count
      this.holeCount = hole.count
      this.holeTypeCount = holetype.count
    },
    getColorTotarRockList() {
      if (this.histogramList && this.tarRockList) {
        // console.log(this.histogramList, this.tarRockList)
        for (const item of this.tarRockList.items) {
          for (const hisItem of this.histogramList) {
            if (item.histogramType === hisItem.type) {
              item.histogramTypeColor = hisItem.img
            }
          }
        }
      }
    }
  }
})

export default useHoleStore
