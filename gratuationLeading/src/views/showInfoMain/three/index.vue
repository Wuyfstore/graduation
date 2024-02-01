<template>
  <div ref="dom" class="three"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAllDatas } from '@/server/https'
import { init } from '@/api/useModel.js'
import useHoleStore from '@/stores/holeStore'
import { storeToRefs } from 'pinia'
import type { HTType } from '@/types/Props'
import NTData from '@/assets/json/NTData.json'

const dom = ref<HTMLDivElement>()
const data = ref<HTType[]>([])
const holeStore = useHoleStore()
const { histogramList } = storeToRefs(holeStore)

const getData = async () => {
  const Datas = await getAllDatas('/ntproject')
  for (const item of Datas.data) {
    if (item.holetype === '取样标贯孔') {
      data.value.push(item)
      for (const ele of data.value) {
        for (const item of ele.items) {
          for (const type of histogramList.value) {
            if (item.histogramType === type.type) {
              item.histogramTypeColor = type.img
            }
          }
        }
      }
    }
  }
}

onMounted(async () => {
  // console.log(NTData)
  const boundaryData = NTData.features[0].geometry.coordinates[0]
  await getData()
  init(dom.value!, '/MapData/newNT.json', data.value)
})
</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
}
</style>
