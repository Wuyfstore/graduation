import * as echarts from 'echarts/core'
import {
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { BarSeriesOption } from 'echarts/charts'
import { HTType } from '@/types/Props'
import { Arrayable } from 'element-plus/es/utils'
import useHoleStore from '@/stores/holeStore'
import { HType } from '@/types/Props'

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>

const holeStore = useHoleStore()

export const configEcharts = (data: HTType) => {
  const histogramList: HType[] = holeStore.histogramList
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [data.label]
    },
    yAxis: {
      type: 'value',
      min: 4.25
    },
    series: []
  }
  const series: Arrayable<BarSeriesOption> = []
  const children = data.children
  for (const items of children) {
    const data = histogramList.filter((item) => item.type === items.histogramType)
    const seriesItem: BarSeriesOption = {
      name: items.histogramType,
      color: data[0].img, //先暂时用这个颜色替代
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        color: '#FFEB3B'
      },
      emphasis: {
        focus: 'series'
      },
      data: [-items.thickness]
    }
    series.push(seriesItem)
  }
  option.series = series
  return option
}
