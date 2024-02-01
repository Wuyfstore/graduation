// import * as echarts from 'echarts/core'
// import {
//   TooltipComponent,
//   type TooltipComponentOption,
//   LegendComponent,
//   type LegendComponentOption
// } from 'echarts/components'
// import { PieChart, type PieSeriesOption } from 'echarts/charts'
// import { LabelLayout } from 'echarts/features'
// import { SVGRenderer } from 'echarts/renderers'

// echarts.use([TooltipComponent, LegendComponent, PieChart, SVGRenderer, LabelLayout])

// type EChartsOption = echarts.ComposeOption<
//   TooltipComponentOption | LegendComponentOption | PieSeriesOption
// >

// var chartDom = document.getElementById('main')!
// var myChart = echarts.init(chartDom, null, {
//   renderer: 'svg'
// })
// var option: EChartsOption

// option = {
//   tooltip: {
//     trigger: 'item'
//   },
//   legend: {
//     top: '5%',
//     left: 'center'
//   },
//   series: [
//     {
//       name: 'Access From',
//       type: 'pie',
//       radius: ['40%', '70%'],
//       avoidLabelOverlap: false,
//       label: {
//         show: false,
//         position: 'center'
//       },
//       emphasis: {
//         label: {
//           show: true,
//           fontSize: 40,
//           fontWeight: 'bold'
//         }
//       },
//       labelLine: {
//         show: false
//       },
//       data: [
//         { value: 1048, name: 'Search Engine' },
//         { value: 735, name: 'Direct' },
//         { value: 580, name: 'Email' },
//         { value: 484, name: 'Union Ads' },
//         { value: 300, name: 'Video Ads' }
//       ]
//     }
//   ]
// }

// option && myChart.setOption(option)

// export default option
