<template>
  <div :class="$style.echart" :style="{ height: height }">
    <slot></slot>
    <div ref="echart"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description ECharts模板
 */
import type { ECharts, EChartsCoreOption } from 'echarts'
import { onMounted, ref, markRaw, watch, onBeforeUnmount, nextTick, type Raw } from 'vue'
import * as echarts from 'echarts/core'

const echart = ref<HTMLDivElement>()

let e: Raw<ECharts> | null = null

type Props = {
  options: EChartsCoreOption
  height: string
}

const props = defineProps<Props>()

const update = () => {
  if (props.options && Object.keys(props.options).length) {
    e?.setOption(props.options)
  }
}

watch(props.options, update, { deep: true })

onBeforeUnmount(() => {
  try {
    e?.dispose()
    e = null
  } catch (e) {
    console.log(e)
    console.warn(e)
  }
})

onMounted(() => {
  nextTick(() => {
    const chartDom = echart.value
    //需要标记markRow 否则表格resize报错
    e = markRaw(echarts.init(chartDom))
  })
})
</script>

<style lang="scss" module>
.echart {
  //position: relative;
  // left: .213542rem /* 41/192 */;
  width: 100% /* 354/192 */;
  height: 128px /* 128/16 */ /* 146/192 */;
  & > div {
    height: 100%;
    width: 100%;
  }
}
</style>
