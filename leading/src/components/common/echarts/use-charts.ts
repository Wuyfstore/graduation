// 只引入echarts使用时必须的核心模块
import * as echarts from 'echarts/core'

//一些通用的必备的echarts预设
import { LabelLayout, UniversalTransition } from 'echarts/features' // 标签自动布局、全局过渡动画等特性
import { CanvasRenderer } from 'echarts/renderers' // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步

// 一些项目中通用的图表渲染部件（也可以不预设引入，也可以引入更多预设的方便使用）
import {
  TooltipComponent, // tooltips
  TitleComponent, // title
  GridComponent // grid 布局
} from 'echarts/components'

// 预先导入一般通用工具组件
echarts.use([
  LabelLayout,
  UniversalTransition,
  CanvasRenderer, // 使用canvas渲染器
  TooltipComponent, // tooltips工具
  TitleComponent, // title
  GridComponent // grid布局
])

// Echart导入组件缓存记录，已导入过的剔除掉，不做重复导入操作
const EchartUsedSet = new WeakSet([TooltipComponent, TitleComponent, GridComponent])
function setAndRemoveDuplicatesEchartUsed(usedComponents: any[]): any[] {
  const restComponents: any[] = []
  for (const component of usedComponents) {
    if (!EchartUsedSet.has(component)) {
      restComponents.push(component)
      EchartUsedSet.add(component)
    }
  }
  return restComponents
}

const useChart = (
  ...usedComponents: any[] // 新增参数，当前绘制图表需要使用的组件
) => {
  // 按需动态地导入所需要的组件
  echarts.use([...setAndRemoveDuplicatesEchartUsed(usedComponents)])

  // ...
}
