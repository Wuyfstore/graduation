<template>
  <div class="holeProfile">
    <div ref="echartDom" class="echart"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { configEcharts } from '@/utils/dynamidEcharts'
import useHoleStore from '@/stores/holeStore'

echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>
const echartDom = ref<HTMLElement>()
const holeStore = useHoleStore()

let option: EChartsOption

const setOption = () => {
  console.log(holeStore.tarRockList)
  option = configEcharts(holeStore.tarRockList)
  return option
}

onMounted(() => {
  // setOption()
  const myChart = echarts.init(echartDom.value, null, {
    renderer: 'svg'
  })
  // 若dom迟钝变化，则resize（）
  const chartObserver = new ResizeObserver(() => {
    myChart.resize()
  })
  chartObserver.observe(echartDom.value!)
  window.addEventListener(
    'resize',
    () => {
      myChart.resize()
    },
    false
  )
  option && myChart.setOption(option)
})
</script>

<style lang="less" scoped>
.holeProfile {
  top: 2%;
  right: 1%;
  padding: 0.5% 0;
  width: 18%;
  height: 60%;
  position: absolute;
  // background: rgba(160, 160, 160, 0.24);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: 1px solid;
  border-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.42),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  pointer-events: auto;
}

.echart {
  padding: 3% 3%;
  width: 95%;
  height: 90%;
}
</style>
