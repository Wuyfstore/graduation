<template>
  <div :id="$style.cesiumMap" ref="cesiumRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initMap, viewFlyToNT } from '@/utils/cesium/initMap'
import { changeMouse, leftClickListener } from '@/utils/cesium/listenEvent'
import { getAllDatas } from '@/server/https'
import state from '@/state'
import config from '@/config'

const cesiumRef = ref<HTMLDivElement>()

const map = () => {
  cesiumRef.value && initMap(config.token, cesiumRef.value, config.cesiumViewConfig)
  viewFlyToNT()
  changeMouse()
  leftClickListener(async (id) => {
    const data = await getAllDatas('/ntproject', id)
    Object.assign(state.holeInfo, data)
    console.log(state.holeInfo)
  })
}

onMounted(map)
</script>

<style lang="scss" module>
#cesiumMap {
  width: 100%;
  height: 100%;
}
</style>
