<template>
  <div class="mb-2 flex items-center text-sm">
    <el-radio-group v-model="layerId" class="ml-4">
      <template v-for="item in radiosConfig" :key="item.id">
        <el-radio :label="item.label" size="large" @click="handleClickRadio(item.url)">{{
          item.label
        }}</el-radio>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { radiosConfig } from '@/assets/config/hitRadioConfig'

const layerId = ref('1')
let imageryLayer: any = null
let imgeryPath: string = 'http://localhost:6080/arcgis/rest/services/bishe/1/MapServer?f=pjson'

const handleClickRadio = async (path: string) => {
  imgeryPath = path
  window.Cesium.removeImageLayer(imageryLayer)
  //会输出点击的值
  imageryLayer = await window.Cesium.addArcGisMapServerImageryProvider(path)
}

onMounted(async () => {
  imageryLayer = await window.Cesium.addArcGisMapServerImageryProvider(imgeryPath)
  console.log(imageryLayer)
})

onBeforeUnmount(() => {
  window.Cesium.removeImageLayer(imageryLayer)
})
</script>
<style scoped lang="less"></style>
