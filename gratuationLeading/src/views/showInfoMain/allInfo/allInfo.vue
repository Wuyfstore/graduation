<template>
  <div class="allInfo">
    <Coverage ref="coverageRef" />
    <BaseHoleInfo />
    <BaseGeoTools />
    <DataScreen />
    <histogramDescriptions />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Coverage from '@/views/showInfoMain/allInfo/coverage.vue'
import BaseHoleInfo from '@/views/showInfoMain/allInfo/baseHoleInfo.vue'
import BaseGeoTools from '@/views/showInfoMain/allInfo/baseGeoTools.vue'
import DataScreen from '@/views/showInfoMain/allInfo/dataScreen.vue'
import histogramDescriptions from './histogramDescriptions.vue'
import 'element-plus/es/components/tree/style/css'

const coverageRef = ref<InstanceType<typeof Coverage>>()
</script>

<style lang="less" scoped>
.allInfo {
  position: absolute;
  pointer-events: none;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}
</style>
